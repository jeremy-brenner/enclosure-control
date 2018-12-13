import appStore from '../stores/AppDataStore.js';

function connectToPrinter() {
  return apiPost('/api/connection', {command: 'connect'});
}

function moveTo(x,y,z) {
  return apiPost(
    '/api/printer/printhead',
    {
      command: "jog",
      absolute: "true",
      x, y, z
    }
  );
}

function home(axes) {
  return apiPost(
    '/api/printer/printhead',
    {
      command: "home",
      axes
    }
  );
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

function getPrinterProfiles() {
  return apiGet('/api/printerprofiles');
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

function getFiles() {
  return apiGet('/api/files');
}

function startJob() {
  return apiPost('/api/control/job', {command: 'start'});
}

function cancelJob() {
  return apiPost('/api/control/job', {command: 'cancel'});
}

function pauseJob() {
  return apiPost('/api/control/job', {command: 'pause'});
}

function restartJob() {
  return apiPost('/api/control/job', {command: 'restart'});
}

function printFile(name) {
  return apiPost(`/api/files/local/${name}`, 
    {
      "command": "select",
      "print": true
    });
}

function loadFile(name) {
  return apiPost(`/api/files/local/${name}`, 
    {
      "command": "select",
      "print": false
    });
}

function setOutputState(id,state) {
  return apiGet(`/plugin/enclosure/setIO?status=${state}&index_id=${id}`);
}

function getJobState() {
  return apiGet('/api/job');
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
  moveTo,
  home,
  getApiVersion,
  getConnectionState,
  getPrinterState,
  getOutputStates,
  setOutputState,
  getJobState,
  getPrinterProfiles,
  getFiles,
  printFile,
  loadFile,
  startJob,
  pauseJob,
  restartJob,
  cancelJob
};