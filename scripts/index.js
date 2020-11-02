#!/usr/bin/env node
const yargs = require('yargs');
const creicons = require('./creicons');

const { argv } = yargs
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

creicons(argv);
