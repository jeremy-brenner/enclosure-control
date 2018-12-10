import appStore from '../stores/AppDataStore.js';

function connectToPrinter() {
  return apiPost('/api/connection', {command: 'connect'});
}

function getApiVersion() {
  return apiGet('/api/version');
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
  return apiGet('/api/connection');
}

function getPrinterState(opts='') {
  return apiGet(`/api/printer?${opts}`);
}

function getOutputStates() {
  return apiGet('/plugin/enclosure/getOutputStatus');
}

function setOutputState(id,state) {
  return apiGet(`/plugin/enclosure/setIO?status=${state}&index_id=${id}`);
}

function apiGet(url) {
  return fetch(`${appStore.get().conf.host}${url}`, requestConfig())
    .then(res => res.json());
}

function apiPost(url,data) {
  return fetch(`${appStore.get().conf.host}${url}`, requestConfig('POST',data));
}

function requestConfig(method='GET',data) { 
  return {
    method,
    headers: {
      'X-Api-Key': appStore.get().conf.key,
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