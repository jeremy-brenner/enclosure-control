import conf from'../conf.json';
import octoStore from './OctoStore.js'

const requestConfig = { 
  headers: {
    "X-Api-Key": conf.key,
    "Content-Type": "application/json"
  }
};


// loop();

function loop() {
  updateAll()
    .then(wait)
    .then(loop);
}

function updateAll() {
  return Promise.all([updatePrinterState(), updateJobState() ]);
}

function wait() {
  return new Promise( (resolve) => { 
    setTimeout(resolve,5000);
  });
}

function updatePrinterState() {
  return fetch(`${conf.host}/api/printer`, requestConfig)
    .then(res => res.json())
    .then(data => {
      octoStore.set(data.state.flags)
    })
    .catch( (wtf) => {
// console.log({wtf});
    });
}

function updateJobState() {
  return fetch(`${conf.octoprint.host}/api/job`, requestConfig)
    .then(res => res.json())
    .then(data => {
      octoStore.set(data.progress);
    });
}

function getOutputStates() {
  return apiCall('/plugin/enclosure/getOutputStatus')
    .then(res => res.json())
    .then( data => {
      const states = {};
      data.forEach( item => states[conf.outputNames[item.index_id]] = item.status );
      return states;
    });
}

function setOutputState(key,state) {
  return apiCall(`/plugin/enclosure/setIO?status=${state}&index_id=${conf.outputIds[key]}`)
    .then(res => res.json());
}

function apiCall(url) {
  return fetch(`${conf.host}${url}`, requestConfig);
}

export {
  getOutputStates,
  setOutputState
};