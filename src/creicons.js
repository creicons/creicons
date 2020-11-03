const path = require('path');
const fs = require('fs');
const SvgoIconUtil = require('./utils/svgo');
const getIconInfos = require('./getIconInfos');
const writeDoc = require('./createDoc');
const createReactComponents = require('./createReactComponents');
const createReactNativeComponents = require('./createReactNativeComponents');

async function creicons(argv) {
    if (argv._.length < 1) {
        throw new Error('At least one of output is required.');
    }
    const inputStr = argv.input || './icons';
    const outputStr = argv.output || './src';
    const outputDir = path.normalize(outputStr);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const svgoIcons = await SvgoIconUtil.getSvgoIcons(inputStr);
    const iconInfos = getIconInfos(svgoIcons);
    if (argv._.includes('doc')) {
        writeDoc(outputDir, iconInfos);
    }

    if (argv._.includes('react')) {
        createReactComponents(outputDir, iconInfos);
    }

    if (argv._.includes('react-native')) {
        createReactNativeComponents(outputDir, iconInfos);
    }
}

module.exports = creicons;
module.exports.default = creicons;

