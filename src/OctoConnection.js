import confStore from'./ConfStore.js';

function getOutputStates() {
  return apiCall('/plugin/enclosure/getOutputStatus')
    .then(res => res.json());
}

function setOutputState(id,state) {
  return apiCall(`/plugin/enclosure/setIO?status=${state}&index_id=${id}`)
    .then(res => res.json());
}

function apiCall(url) {
  return fetch(`${confStore.get().host}${url}`, requestConfig());
}

function requestConfig() { 
  return {
    headers: {
      "X-Api-Key": confStore.get().key,
      "Content-Type": "application/json"
    }
  }
};


export {
  getOutputStates,
  setOutputState
};