const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');
const cheerio = require('cheerio');

function getIcons(input) {
    const filepaths = globby.sync(input);
    const svgFilepaths = filepaths.filter(filepath => path.parse(filepath).ext === '.svg');
    if (svgFilepaths.length < 1) {
        throw new Error('SVG files was not found.');
    }

    return svgFilepaths.map(filepath => {
        const filename = path.parse(filepath).name;
        const svg = fs.readFileSync(path.resolve(filepath), 'utf8');
        const svgElement = cheerio.load(svg)('svg');
        const svgWidth = parseInt(svgElement.attr('width')) || 16;
        const svgHeight = parseInt(svgElement.attr('height')) || 16;
        const viewBox = parseInt(svgElement.attr('viewBox')) || '0 0 16 16';
        const svgPath = svgElement.children('path');
        const d = svgPath.attr('d');
        const fillRule = svgPath.attr('fill-rule');
        return {
            name: filename,
            width: svgWidth,
            height: svgHeight,
            viewBox,
            fillRule,
            d,
        };
    });
}

module.exports = getIcons;
