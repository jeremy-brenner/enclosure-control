import confStore from '../stores/ConfStore.js';

function connectToPrinter() {
  return apiPost('/api/connection', {command: 'connect'});
}

function getApiVersion() {
  return apiGet('/api/version')
  .then(res => res.json());
}

function setTemp(key,temp) {
  return key==='bed' ? setBedTemp(temp) : setToolTemp(key,temp);
}

function setBedTemp(temp) {
  return apiPost('/api/printer/bed',  {
    command: 'target',
    target: temp
  });
}

function setToolTemp(key,temp) {
  return apiPost('/api/printer/tool',  {
    command: 'target',
    targets: {
      [key]: temp
    }
  });
}


function getConnectionState() {
  return apiGet('/api/connection')
    .then(res => res.json());
}

function getPrinterState(opts='') {
  return apiGet(`/api/printer?${opts}`)
    .then(res => res.json());
}

function getOutputStates() {
  return apiGet('/plugin/enclosure/getOutputStatus')
    .then(res => res.json());
}

function setOutputState(id,state) {
  return apiGet(`/plugin/enclosure/setIO?status=${state}&index_id=${id}`)
    .then(res => res.json());
}

function apiGet(url) {
  return fetch(`${confStore.get().host}${url}`, requestConfig());
}

function apiPost(url,data) {
  return fetch(`${confStore.get().host}${url}`, requestConfig('POST',data));
}

function requestConfig(method='GET',data) { 
  return {
    method,
    headers: {
      'X-Api-Key': confStore.get().key,
      'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : undefined
  }
};


export {
  connectToPrinter,
  setTemp,
  getApiVersion,
  getConnectionState,
  getPrinterState,
  getOutputStates,
  setOutputState
};