
const { CSG } = require('@jscad/csg');

const slice = (inputCsg, sliceCount) => {

  const centeredCsg = inputCsg.center([true,true,true]);
  const inputBounds = centeredCsg.getBounds();
  const height = inputBounds[1]._z - inputBounds[0]._z;
  const zMulti = 100/height;

  const scaledCsg = centeredCsg.scale(zMulti);

  const bounds = scaledCsg.getBounds();

  const box = {
    x: bounds[1]._x - bounds[0]._x,
    y: bounds[1]._y - bounds[0]._y,
    z: bounds[1]._z - bounds[0]._z
  }

  const sliceThickness = box.z/sliceCount;

  const cubeSlice = (i) => {
    console.log(`Slice ${i}`);
    return CSG.cube({
      corner2: [bounds[0].x, bounds[0].y, bounds[0].z + sliceThickness*i ],
      corner1: [bounds[1].x, bounds[1].y, bounds[0].z + sliceThickness*i + sliceThickness]
    }).intersect(scaledCsg);
  }

  const promises = numberArray(sliceCount).map( i => cubeSlice(i) );
  
  return Promise.all(promises);
}

function numberArray(count) {
  return [...Array(count).keys()];
}

module.exports = slice;