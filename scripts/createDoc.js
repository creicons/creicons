const fs = require("fs");

function writeDoc(icons) {
    const header = `## Icons\n\n| name | icon |\n|---|---|\n`;
    const body = icons.map(iconInfo => `| ${iconInfo.name} | <img src="./icons/${iconInfo.name}.svg" width="24" height="24" alt="${iconInfo.name}" /> |\n`).join('');
    fs.writeFile('./icons.md', header + body, () => {
        console.info('Success to create icons.md.');
    });
}

module.exports = writeDoc;
