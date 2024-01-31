/* eslint-disable no-undef */

const fs = require('fs');
const { parse } = require('node-html-parser');

// Function to read, modify, and output HTML
function processHtmlFile(filePath) {
  // Read the HTML file
  fs.readFile(filePath, 'utf8', (err, htmlContent) => {
    if (err) {
      console.error('Error reading the HTML file:', err);
      return;
    }

    // Parse the HTML
    const root = parse(htmlContent);

    // Remove all <style> tags
    root.querySelectorAll('style').forEach(styleTag => {
      styleTag.remove();
    });

    // Remove the first <script> tag
    const firstScriptTag = root.querySelector('script');
    if (firstScriptTag) {
      firstScriptTag.remove();
    }

    // Write the modified HTML to a new file
    fs.writeFile(filePath, root.toString(), err => {
      if (err) {
        console.error('Error writing the modified HTML to file:', err);
        return;
      }
    
      console.log('Modified HTML has been saved to', filePath);
    });
  });
}

// Replace with your HTML file path
const filePath = 'dist/index.html';
processHtmlFile(filePath);