const puppeteer = require('puppeteer');
const axios = require('axios');
const https = require('https');

(async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors']
    });
    const page = await browser.newPage();
    await page.goto('https://www.nsfas.org.za/', { waitUntil: 'networkidle2' });

    // Ignore SSL certificate errors
    const agent = new https.Agent({  
        rejectUnauthorized: false
    });

    axios.get('https://www.nsfas.org.za/', { httpsAgent: agent })
        .then(response => {
            // Handle response
            console.log('Fetched data successfully.');
        })
        .catch(error => {
            console.error('Error fetching the webpage:', error.message);
        });

    await browser.close();
})();
