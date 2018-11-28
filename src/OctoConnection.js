import conf from'../conf.json';
import octoStore from './OctoStore.js'

const requestConfig = { 
  headers: {
    "X-Api-Key": conf.octoprint.key,
    "Content-Type": "application/json"
  }
};
fetch(`${conf.octoprint.host}/api/printer`, requestConfig)
  .then(res => res.json())
  .then(data => {
    octoStore.set({printerState:data.state.text})
  });

export default {

};