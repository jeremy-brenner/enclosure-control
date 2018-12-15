const fs = require('fs');
const stlDeSerializer = require('@jscad/stl-deserializer');
const stlSerializer = require('@jscad/stl-serializer');
const { CSG } = require('@jscad/csg');

const sliceCount = 100;

const slice = (file,outDir) => {

  if(!file || !file.match(/\.stl$/) ) {
    console.log("specify an input stl to slice");
    return;
  }

  console.log('Slicing...');

  const baseName = file.replace('.stl','');

  const rawData = fs.readFileSync(file);
  const inputCsg = stlDeSerializer.deserialize(rawData, undefined, {output: 'csg'}).center([true,true,true]);

  const inputBounds = inputCsg.getBounds();
  const height = inputBounds[1]._z - inputBounds[0]._z;
  const zMulti = 100/height;

  const scaledCsg = inputCsg.scale(zMulti);

  const bounds = scaledCsg.getBounds();

  const box = {
    x: bounds[1]._x - bounds[0]._x,
    y: bounds[1]._y - bounds[0]._y,
    z: bounds[1]._z - bounds[0]._z
  }

  const sliceThickness = box.z/sliceCount;

  const cubeSlice = (i) => CSG.cube({
    corner2: [bounds[0].x, bounds[0].y, bounds[0].z + sliceThickness*i ],
    corner1: [bounds[1].x, bounds[1].y, bounds[0].z + sliceThickness*i + sliceThickness]
  }).intersect(scaledCsg);


  const promises = numberArray(sliceCount)
    .map( i => {
      const filename = `${outDir}/${baseName}-${i.toString().padStart(2, '0')}.stl`;
      console.log(`Writing ${filename}`);
      const stl = stlSerializer.serialize(cubeSlice(i), {binary: false});
      return saveFile(filename, stl);
    })
  
  return Promise.all(promises).then( () => console.log('Done!'));
}

function saveFile(filename, data) {
  return new Promise( (resolve,reject) => {
    fs.writeFile( filename, data, (err) => err ? reject(err): resolve());
  });
}

function numberArray(count) {
  return [...Array(count).keys()];
}

module.exports = slice;