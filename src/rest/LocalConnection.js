
function getConf() {
  return fetch('/conf.json')
    .then(res => res.json());
}

function getAppMd5() {
  return fetch('/md5.json')
    .then(res => res.json());
}

function getSliceManifest(name) {
  return fetch(`/slices/${name}.json`)
    .then(res => res.json());
}

export { getConf, getAppMd5, getSliceManifest }