import * as THREE from 'three';
import almostStlLoader from 'three-stl-loader';

const STLLoader = almostStlLoader(THREE);
const loader = new STLLoader();

const LoadSlices = (name) => {
  return Promise.all(fileNames(name).map(loadSlice));
}

function loadSlice({file,name}) {
  return new Promise( resolve =>  {
    loader.load( file, geometry => {
      geometry.name = name;
      resolve(geometry);
    })
   });
  
} 

function fileNames(name) {
  return paddedNumbers(100)
    .map( n => ({ file: `slices/${name}-${n}.stl`, name: `${name}-${n}`}))
}

function paddedNumbers(count) {
  return [...Array(count).keys()].map( i => `${i}`.padStart(2, '0'));
}

export default LoadSlices;