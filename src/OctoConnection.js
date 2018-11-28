import conf from'../conf.json';
import octoStore from './OctoStore.js'

const requestConfig = { 
  headers: {
    "X-Api-Key": conf.octoprint.key,
    "Content-Type": "application/json"
  }
};


loop();

function loop() {
  update()
    .then(wait)
    .then(loop);
}

function update() {
  return Promise.all([getPrinterState(), getJobState() ]);
}

function wait() {
  return new Promise( (resolve) => { 
    setTimeout(resolve,5000);
  });
}

function getPrinterState() {
  return fetch(`${conf.octoprint.host}/api/printer`, requestConfig)
    .then(res => res.json())
    .then(data => {
      octoStore.set(data.state.flags)
    });
}

function getJobState() {
  return fetch(`${conf.octoprint.host}/api/job`, requestConfig)
    .then(res => res.json())
    .then(data => {
      octoStore.set(data.progress);
    });
}

export default {

};