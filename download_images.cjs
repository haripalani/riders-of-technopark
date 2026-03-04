const { chromium } = require('playwright');
const fs = require('fs');
const https = require('https');
const path = require('path');

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            // Handle redirects (e.g., from Unsplash)
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
            }

            if (response.statusCode === 200) {
                const fileStream = fs.createWriteStream(filepath);
                response.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve(filepath);
                });
            } else {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
};

(async () => {
    const urlsToScrape = [
        'https://ridersoftechnopark.com/',
        'https://ridersoftechnopark.com/rides'
    ];

    // In Next.js, static files go in the 'public' directory
    const outputDir = path.join(__dirname, 'public', 'assets', 'images');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log("Launching browser...");
    const browser = await chromium.launch();
    const page = await browser.newPage();

    let allImageUrls = new Set();

    for (const url of urlsToScrape) {
        console.log(`Navigating to ${url}...`);
        await page.goto(url, { waitUntil: 'networkidle' });

        // Extract <img> src
        const imgUrls = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('img'))
                .map(img => img.src)
                .filter(src => src && src.startsWith('http'));
        });

        imgUrls.forEach(src => allImageUrls.add(src));

        // Extract background images
        const bgUrls = await page.evaluate(() => {
            const elements = document.querySelectorAll('*');
            const bgs = [];
            elements.forEach(el => {
                const bg = window.getComputedStyle(el).backgroundImage;
                if (bg && bg !== 'none' && bg.includes('url(')) {
                    // Extract URL from url("...")
                    const match = bg.match(/url\(['"]?(.*?)['"]?\)/);
                    if (match && match[1] && match[1].startsWith('http')) {
                        bgs.push(match[1]);
                    }
                }
            });
            return bgs;
        });

        bgUrls.forEach(src => allImageUrls.add(src));
    }

    await browser.close();

    console.log(`Found ${allImageUrls.size} unique images. Downloading...`);

    let count = 1;
    for (let imgUrl of allImageUrls) {
        try {
            // Decode the URL before trying to parse a filename
            const decodedUrl = decodeURIComponent(imgUrl);
            let filename = decodedUrl.substring(decodedUrl.lastIndexOf('/') + 1).split('?')[0];

            // Generate a stable filename if the parsed one is empty, weird, or lacks an extension
            if (!filename || filename.length > 50 || !filename.includes('.')) {
                const extMatch = imgUrl.match(/\.(jpeg|jpg|png|svg|webp|gif)/i);
                const ext = extMatch ? extMatch[0] : '.jpg'; // default to .jpg
                filename = `rot_image_${count++}${ext}`;
            }

            let filepath = path.join(outputDir, filename);
            let checkCount = 1;

            // To prevent overwriting different files with the same name
            while (fs.existsSync(filepath)) {
                const parsed = path.parse(filename);
                filepath = path.join(outputDir, `${parsed.name}_${checkCount}${parsed.ext}`);
                checkCount++;
            }

            console.log(`Downloading ${filename}...`);
            await downloadImage(imgUrl, filepath);
        } catch (err) {
            console.error(`Failed to download ${imgUrl}:`, err.message);
        }
    }

    console.log(`\nFinished downloading images to public/assets/images/`);
    console.log(`Note: To use these in your code, reference them as '/assets/images/filename.ext'`);
})();
