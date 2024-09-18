const axios = require('axios');
const cheerio = require('cheerio');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// URL of the NSFAS application page
const url = 'https://www.nsfas.org.za/';

axios.get(url)
  .then(response => {
    // Load the HTML into cheerio
    const $ = cheerio.load(response.data);

    // Find the relevant section that indicates the application status
    // (Update the selector below to match the actual HTML structure)
    const statusSection = $('.application-status'); // Replace with actual selector if known

    if (statusSection.length > 0) {
      const statusText = statusSection.text().trim();

      // Check the content to determine if applications are open or closed
      if (statusText.toLowerCase().includes('open')) {
        console.log('NSFAS applications are currently open.');
      } else if (statusText.toLowerCase().includes('closed')) {
        console.log('NSFAS applications are currently closed.');
      } else {
        console.log('Unable to determine the application status from the webpage.');
      }
    } else {
      console.log('Application status section not found on the webpage.');
    }
  })
  .catch(error => {
    console.error('Error fetching the webpage:', error.message);
  });
