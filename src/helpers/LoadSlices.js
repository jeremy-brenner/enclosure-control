const loader = new THREE.STLLoader();

const LoadSlices = (name) => {
  return Promise.all(fileNames(name).map(loadSlice));
}

function loadSlice({file,name}) {
  return new Promise( resolve => 
    loader.load( file, geometry => {
      geometry.name = name;
      resolve(geometry);
    })
  );
} 

function fileNames(name) {
  return paddedNumbers(100)
    .map( n => ({ file: `slices/${name}-${n}.stl`, name: `${name}-${n}`}))
}

function paddedNumbers(count) {
  return [...Array(count).keys()].map( i => `${i}`.padStart(2, '0'));
}

export default LoadSlices;