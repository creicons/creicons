const FS = require('fs');
const Path = require('path');

function writeDoc(outputDir, icons) {
    const iconDir = Path.join(outputDir, '_icons');
    if (!FS.existsSync(iconDir)) {
        FS.mkdirSync(iconDir);
    }
    const header = `## Icons\n\n| name | icon |\n|---|---|\n`;
    const body = icons.map(
        iconInfo => {
            const { data, info } = iconInfo;
            FS.writeFileSync(Path.join(iconDir, `${info.name}.svg`), data);
            return `| ${info.name} | <img src="./_icons/${info.name}.svg" width="24" height="24" alt="${info.name}" /> |\n`;
        },
    ).join('');
    FS.writeFileSync(Path.join(outputDir, 'icons.md'), header + body);
}

module.exports = writeDoc;
