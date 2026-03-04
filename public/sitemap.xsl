<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>XML Sitemap | Riders of Technopark</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <style type="text/css">
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                        font-size: 13px;
                        color: #a1a1aa;
                        background: #000;
                        margin: 0;
                        padding: 0;
                    }
                    a {
                        color: #ef4444;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                    .header {
                        background: #09090b;
                        padding: 40px 20px;
                        border-bottom: 2px solid #dc2626;
                        text-align: center;
                    }
                    .header h1 {
                        color: #fff;
                        margin: 0;
                        font-size: 24px;
                        font-weight: 900;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                    }
                    .header p {
                        margin: 10px 0 0;
                        color: #71717a;
                    }
                    .content {
                        max-width: 1000px;
                        margin: 40px auto;
                        padding: 0 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        background: #09090b;
                        border: 1px solid #27272a;
                    }
                    th {
                        text-align: left;
                        padding: 15px;
                        background: #18181b;
                        color: #fff;
                        text-transform: uppercase;
                        font-size: 11px;
                        letter-spacing: 1px;
                        border-bottom: 1px solid #27272a;
                    }
                    td {
                        padding: 15px;
                        border-bottom: 1px solid #18181b;
                    }
                    tr:hover td {
                        background: #18181b;
                    }
                    .footer {
                        text-align: center;
                        padding: 40px 20px;
                        color: #52525b;
                        font-size: 11px;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Riders of Technopark Sitemap</h1>
                    <p>Total URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></p>
                </div>
                <div class="content">
                    <table>
                        <thead>
                            <tr>
                                <th width="70%">URL</th>
                                <th width="10%">Priority</th>
                                <th width="10%">Frequency</th>
                                <th width="10%">Last Mod</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="sitemap:urlset/sitemap:url">
                                <tr>
                                    <td>
                                        <xsl:variable name="itemURL">
                                            <xsl:value-of select="sitemap:loc"/>
                                        </xsl:variable>
                                        <a href="{$itemURL}">
                                            <xsl:value-of select="sitemap:loc"/>
                                        </a>
                                    </td>
                                    <td>
                                        <xsl:value-of select="sitemap:priority"/>
                                    </td>
                                    <td>
                                        <xsl:value-of select="sitemap:changefreq"/>
                                    </td>
                                    <td>
                                        <xsl:value-of select="substring(sitemap:lastmod, 0, 11)"/>
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </tbody>
                    </table>
                </div>
                <div class="footer">
                    Generated by ROT Engine. Ride. Respect. Brotherhood.
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
