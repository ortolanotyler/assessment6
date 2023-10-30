const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');

if (process.argv.length !== 3) {
  console.error('Usage: node urls.js FILENAME');
  process.exit(1);
}

const fileName = process.argv[2];

fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    process.exit(1);
  }

  const urls = data.trim().split('\n');

  urls.forEach((urlStr) => {
    const parsedUrl = new URL(urlStr);
    const hostName = parsedUrl.hostname;
    const outputPath = `${hostName}.txt`;

    const httpModule = parsedUrl.protocol === 'https:' ? https : http;

    const request = httpModule.get(urlStr, (response) => {
      if ([301, 302, 303, 307, 308].includes(response.statusCode)) {
        // Handle redirects by following the 'Location' header
        if (response.headers.location) {
          const redirectUrl = url.resolve(urlStr, response.headers.location);
          request.abort(); // Abort the current request
          return httpModule.get(redirectUrl, (redirectResponse) => {
            // Handle the redirected response here
            // ...
          });
        }
      }

      if (response.statusCode !== 200) {
        console.error(`Failed to retrieve ${urlStr}. Status code: ${response.statusCode}`);
        return;
      }

      let htmlData = '';

      response.on('data', (chunk) => {
        htmlData += chunk;
      });

      response.on('end', () => {
        fs.writeFile(outputPath, htmlData, 'utf8', (writeErr) => {
          if (writeErr) {
            console.error(`Error writing ${outputPath}:`, writeErr);
          } else {
            console.log(`Saved HTML from ${urlStr} to ${outputPath}`);
          }
        });
      });
    }).on('error', (httpError) => {
      console.error(`Error while fetching ${urlStr}:`, httpError);
    });
  });
});

