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
    .map( n => {
      if(n==="100") {
        return [
          { 
            file: `slices/${name}-${n}-full.stl`, 
            name: `${n}-full`
          }
        ];
      }
      return [
        { 
          file: `slices/${name}-${n}-top.stl`, 
          name: `${n}-top`
        },
        { 
          file: `slices/${name}-${n}-bottom.stl`, 
          name: `${n}-bottom`
        }
      ];
    }).reduce((acc, a) => acc.concat(a), []);
}

function paddedNumbers(count) {
  return [...Array(count).keys()].map( i => `${i+1}`.padStart(2, '0'));
}

export default LoadSlices;