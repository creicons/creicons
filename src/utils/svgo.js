const SVGO = require('svgo/lib/svgo');
const FS = require('fs');
const Globby = require('globby');
const Path = require('path');

const svgo = new SVGO({
    plugins: [{
        cleanupAttrs: true,
    }, {
        removeDoctype: true,
    }, {
        removeXMLProcInst: true,
    }, {
        removeComments: true,
    }, {
        removeMetadata: true,
    }, {
        removeTitle: true,
    }, {
        removeDesc: true,
    }, {
        removeUselessDefs: true,
    }, {
        removeEditorsNSData: true,
    }, {
        removeEmptyAttrs: true,
    }, {
        removeHiddenElems: true,
    }, {
        removeEmptyText: true,
    }, {
        removeEmptyContainers: true,
    }, {
        removeViewBox: false,
    }, {
        cleanupEnableBackground: true,
    }, {
        convertStyleToAttrs: true,
    }, {
        convertColors: true,
    }, {
        convertPathData: true,
    }, {
        convertTransform: true,
    }, {
        removeUnknownsAndDefaults: true,
    }, {
        removeNonInheritableGroupAttrs: true,
    }, {
        removeUselessStrokeAndFill: true,
    }, {
        removeUnusedNS: true,
    }, {
        cleanupIDs: true,
    }, {
        cleanupNumericValues: true,
    }, {
        moveElemsAttrsToGroup: true,
    }, {
        moveGroupAttrsToElems: true,
    }, {
        collapseGroups: true,
    }, {
        removeRasterImages: false,
    }, {
        mergePaths: true,
    }, {
        convertShapeToPath: true,
    }, {
        sortAttrs: true,
    }, {
        removeDimensions: true,
    }, {
        removeAttrs: { attrs: '(stroke|fill)' },
    }]
});

async function getSvgoIcon(filepath) {
    const fileData = await FS.promises.readFile(filepath);
    const svgoResult = svgo.optimize(fileData, { path: filepath });
    return svgoResult;
}

async function getSvgoIcons(dir) {
    const filepaths = Globby.sync(dir);
    const svgFilepaths = filepaths.filter(filepath => Path.parse(filepath).ext === '.svg');
    if (svgFilepaths.length < 1) {
        throw new Error('SVG files was not found.');
    }
    const svgoPromises = svgFilepaths.map(getSvgoIcon);
    const results = await Promise.all(svgoPromises);
    return results;
}

module.exports = { getSvgoIcon, getSvgoIcons };
