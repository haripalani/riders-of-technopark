import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function scrapeContent() {
    try {
        const { data } = await axios.get('https://ridersoftechnopark.com/');
        const $ = cheerio.load(data);
        const dataScript = $('script:contains("siteContent")').html();
        if (dataScript) {
            console.log("Found siteContent script");
            console.log(dataScript.substring(0, 500));
        } else {
            console.log("No script matched.");
            console.log("Title: ", $('title').text());
        }
    } catch (err) {
        console.error(err.message);
    }
}

scrapeContent();
