const slicer = require('./slice');
const fs = require('fs');
const stlDeSerializer = require('@jscad/stl-deserializer');
const stlSerializer = require('@jscad/stl-serializer');
const { CSG } = require('@jscad/csg');

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

const slice = slicer(inputCsg,100);

numbers(100)
  .reduce( (p,i) => {
    return p.then( () => {
      const num = i+1;
      const filebase = `${outDir}/${baseName}-${num.toString().padStart(2, '0')}`;
      const parts = slice(num);
      const promises = Object.keys(parts).map( key => {
        const stl = stlSerializer.serialize( parts[key], {binary: true});
        return saveFile(`${filebase}-${key}.stl`, stl );
      })
      return Promise.all(promises);
    });
  }, Promise.resolve())
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