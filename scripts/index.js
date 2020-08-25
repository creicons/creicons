#!/usr/bin/env node
const yargs = require('yargs');
const getIcons = require('./parseIcons');
const writeDoc = require('./createDoc');
const createReactComponents = require('./createReactComponents');
const path = require('path');
const fs = require('fs');

const {argv} = yargs
  .usage('Usage: creicons --input <input filepaths> --output <output filepath>')
  .example('creicons --input icons/**/*.svg --output build/data.json')
  .option('input', {
    alias: 'i',
    type: 'array',
    demandOption: true,
    describe: 'Input SVG files.'
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    describe: 'Ouput components folder, defalut is "./src". '
  });

// create output dir
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
