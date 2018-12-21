
const { CSG } = require('@jscad/csg');

const slice = (inputCsg, sliceCount) => {

  const centeredCsg = inputCsg.center([true,true,true]);
  const inputBounds = centeredCsg.getBounds();
  const height = inputBounds[1]._z - inputBounds[0]._z;
  const zMulti = sliceCount/height;

  const scaledCsg = centeredCsg.scale(zMulti);

  const bounds = scaledCsg.getBounds();

  const box = {
    x: bounds[1]._x - bounds[0]._x,
    y: bounds[1]._y - bounds[0]._y,
    z: bounds[1]._z - bounds[0]._z
  }

  const sliceThickness = box.z/sliceCount;

  return (i) => {
    const objects = {};
    
    if( i > 1 ) {
      objects.completed = CSG.cube({
        corner1: [bounds[0].x, bounds[0].y, bounds[0].z],
        corner2: [bounds[1].x, bounds[1].y, bounds[0].z + sliceThickness*(i-1)]
      }).intersect(scaledCsg);
    }
    
    if( i > 0 && i < sliceCount ) {
      objects.current = CSG.cube({
        corner1: [bounds[0].x, bounds[0].y, bounds[0].z + sliceThickness*(i-1)],
        corner2: [bounds[1].x, bounds[1].y, bounds[0].z + sliceThickness*i]
      }).intersect(scaledCsg);
    }

    if( i < sliceCount ) {
      objects.remaining = CSG.cube({
        corner1: [bounds[0].x, bounds[0].y, bounds[0].z + sliceThickness*i],
        corner2: [bounds[1].x, bounds[1].y, bounds[1].z]
      }).intersect(scaledCsg);
    }
    
    return objects;
  }

}

module.exports = slice;