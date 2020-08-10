#!/usr/bin/env node
const yargs = require('yargs');
const getIcons = require('./parseIcons');
const writeDoc = require('./createDoc');

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
console.log('argv', argv);
console.log('argv_', argv._);

if (argv._.length < 1) {
    throw new Error('At least one of output is required.');
}
console.log('argv_2', argv._);
const icons = getIcons(argv.input);
if (argv._.includes('doc')) {
    writeDoc(icons);
}
