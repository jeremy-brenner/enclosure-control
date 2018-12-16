const slice = require('./slice');
const fs = require('fs');
const stlDeSerializer = require('@jscad/stl-deserializer');
const stlSerializer = require('@jscad/stl-serializer');
const { CSG } = require('@jscad/csg');

const file = process.argv[2];
const outDir = process.argv[3];

if(!file) {
  console.log("specify an input stl to slice");
  return;
}

let baseName, inputCsg;

if( file.match(/\.stl$/) ) {
  baseName = file.replace('.stl','').split('/').pop();
  const rawData = fs.readFileSync(file);
  inputCsg = stlDeSerializer.deserialize(rawData, undefined, {output: 'csg'});
}else{
  baseName = file
  inputCsg = CSG[file]();
}

console.log('Slicing...');

slice(inputCsg,100)
  .then( slices => slices.map( (slice,i) => {
      const filename = `${outDir}/${baseName}-${i.toString().padStart(2, '0')}.stl`;
      const stl = stlSerializer.serialize(slice, {binary: false});
      return saveFile(filename, stl);
    }))
  .then( p => Promise.all(p))
  .then(() => console.log('Done!'));


function saveFile(filename, data) {
    console.log(`Saving ${filename}`);
    return new Promise( (resolve,reject) => {
      fs.writeFile( filename, data, (err) => err ? reject(err): resolve());
    })
    .catch((err) => console.error(`Problem saving ${filename}: ${err}`));
  }
  