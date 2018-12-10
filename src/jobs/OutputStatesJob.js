
import Job from './Job.js'
import { getOutputStates } from '../rest/OctoConnection.js';

class OutputStatesJob extends Job {
  constructor(store) {
    super();
    this.store = store;
    this.id = 'outputStates';
    this.dependsOn = ['conf', 'apiVersion'];
  }
  exec() {
    return getOutputStates()
      .then((outputStates) => this.store.set({outputStates}));
  }     
}

export default OutputStatesJob;
