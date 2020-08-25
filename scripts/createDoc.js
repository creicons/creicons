const fs = require('fs');
const path = require('path');

function writeDoc(outputDir, icons) {
    const header = `## Icons\n\n| name | icon |\n|---|---|\n`;
    const body = icons.map(
        iconInfo => `| ${iconInfo.name} | <img src="./icons/${iconInfo.name}.svg" width="24" height="24" alt="${iconInfo.name}" /> |\n`,
    ).join('');
    fs.writeFileSync(path.join(outputDir, 'icons.md'), header + body);
}

module.exports = writeDoc;
