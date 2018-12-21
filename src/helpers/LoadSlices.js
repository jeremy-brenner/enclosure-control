import * as THREE from 'three';
import almostStlLoader from 'three-stl-loader';
import { getSliceManifest } from '../rest/LocalConnection';

const STLLoader = almostStlLoader(THREE);
const loader = new STLLoader();

const LoadSlices = (name) => {
  return getSliceManifest(name)
    .then( ({files}) => Promise.all(files.map(loadSlice)) );
}

function loadSlice(file) {
  return new Promise( resolve =>  {
    loader.load( `slices/${file}`, geometry => {
      geometry.name = file.replace('.stl','').split('-').slice(1).join('-');
      resolve(geometry);
    })
   });
  
} 

export default LoadSlices;