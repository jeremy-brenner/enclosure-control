const slicer = require('./slice');
const fs = require('fs');
const stlDeSerializer = require('@jscad/stl-deserializer');
const stlSerializer = require('@jscad/stl-serializer');

const file = process.argv[2];
const outDir = process.argv[3];

if(!file || !file.match(/\.stl$/)) {
  console.log("specify an input stl to slice");
  return;
}

const baseName = file.replace('.stl','').split('/').pop();
const rawData = fs.readFileSync(file);
const inputCsg = stlDeSerializer.deserialize(rawData, undefined, {output: 'csg'});

console.log('Slicing...');

const slices = 100;
const slice = slicer(inputCsg,slices);

const manifest = {
  files: []
}

numbers(slices+2)
  .reduce( (p,num) => {
    return p.then( () => {
      const filebase = `${baseName}-${num.toString().padStart(2, '0')}`;
      const parts = slice(num);
      const promises = Object.keys(parts).map( key => {
        const stl = stlSerializer.serialize( parts[key], {binary: true});
        const filename = `${filebase}-${key}.stl`;
        manifest.files.push(filename);
        return saveFile( `${outDir}/${filename}`, stl );
      })
      return Promise.all(promises);
    });
  }, Promise.resolve())
  .then(() => saveFile(`${outDir}/${baseName}.json`,[JSON.stringify(manifest)]) )
  .then(() => console.log('Done!'))
  .catch(e => console.error(e));


function saveFile(filename, data) {
    console.log(`Saving ${filename}`);
    return new Promise( (resolve,reject) => {
      const stream = fs.createWriteStream(filename);
      data.forEach( ab => {
        stream.write(Buffer.from(ab));
      })
      stream.end();
      stream.on('finish', () => resolve() );
    })
    .catch((err) => console.error(`Problem saving ${filename}: ${err}`));
  }
  


function numbers(count) {
  return [...Array(count).keys()];
}