const Path = require('path');
const Cheerio = require('cheerio');

function getIconInfos(svgoIcons) {
    return svgoIcons.map(svgoIcon => {
        const { data, info, path } = svgoIcon;
        const fileName = Path.parse(path).name.trim().split(/ |-/).map(
            (str) => str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase()),
        ).join('');
        const svgElement = Cheerio.load(data)('svg');
        const viewBox = svgElement.attr('viewBox') || '0 0 16 16';
        const [, , viewBoxWidth, viewBoxHeight] = viewBox.split(' ');

        const svgWidth = info.width || viewBoxWidth;
        const svgHeight = info.height || viewBoxHeight;
        const svgPath = svgElement.children('path');
        const d = svgPath.attr('d');
        const fillRule = svgPath.attr('fill-rule');
        return {
            ...svgoIcon,
            info: {
                name: fileName,
                componentName: `${fileName}Icon`,
                width: svgWidth,
                height: svgHeight,
                viewBox,
                fillRule,
                d,
            },
        };
    });
}

module.exports = getIconInfos;
