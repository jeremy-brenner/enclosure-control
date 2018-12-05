import conf from'../../conf.json';

function connect() {
  return apiPost('/api/connection', {command: 'connect'});
}

function getApiVersion() {
  return apiGet('/api/version')
  .then(res => res.json());
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
  return fetch(`${conf.host}${url}`, requestConfig());
}

function apiPost(url,data) {
  return fetch(`${conf.host}${url}`, requestConfig('POST',data));
}

function requestConfig(method='GET',data) { 
  return {
    method,
    headers: {
      'X-Api-Key': conf.key,
      'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : undefined
  }
};


export {
  connect,
  getApiVersion,
  getConnectionState,
  getPrinterState,
  getOutputStates,
  setOutputState
};