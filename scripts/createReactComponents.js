const fs = require('fs');
const path = require('path');

function createReactComponent(componentsDir, iconInfo) {
    const { name, width, height, fillRule, d } = iconInfo;
    const componentName = name.trim().split(' ').map(
        (str) => str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase()),
    ).join('');
    const componentDir = path.join(componentsDir, componentName);
    console.log('componentDir', componentDir);
}

function createReactComponents(outputDir, icons) {
    const componentsDir = path.join(outputDir, 'react-icons');
    if (!fs.existsSync(componentsDir)) {
        fs.mkdirSync(componentsDir);
    }
    icons.map((iconInfo) => createReactComponent(componentsDir, iconInfo));
}

module.exports = createReactComponents;
