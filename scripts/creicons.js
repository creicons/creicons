const getIcons = require('./parseIcons');
const writeDoc = require('./createDoc');
const createReactComponents = require('./createReactComponents');
const createReactNativeComponents = require('./createReactNativeComponents');
const path = require('path');
const fs = require('fs');

function creicons(argv) {
    const outputStr = argv.output || './src';
    const outputDir = path.normalize(outputStr);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    if (argv._.length < 1) {
        throw new Error('At least one of output is required.');
    }

    const icons = getIcons(argv.input);
    if (argv._.includes('doc')) {
        writeDoc(outputDir, icons);
    }

    if (argv._.includes('react')) {
        createReactComponents(outputDir, icons);
    }

    if (argv._.includes('react-native')) {
        createReactNativeComponents(outputDir, icons);
    }
}

module.exports = creicons;
