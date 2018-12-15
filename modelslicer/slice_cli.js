const slice = require('./slice');

const file = process.argv[2];
const outDir = process.argv[3];

slice(file,outDir);