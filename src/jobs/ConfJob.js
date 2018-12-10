import Job from './Job.js'
import { getConf } from '../rest/LocalConnection.js'

class ConfJob extends Job {
  constructor(store) {
    super();
    this.store = store;
    this.id = 'conf';
    this.dependsOn = [];
  }
  exec() {
    return getConf()
      .then(conf => this.store.set({conf}));
  }     
}

export default ConfJob;