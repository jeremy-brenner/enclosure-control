import Job from './Job.js'
import { getApiVersion } from '../rest/OctoConnection.js';

class ApiVersionJob extends Job {
  constructor(store) {
    super();
    this.store = store;
    this.id = 'apiVersion';
    this.dependsOn = ['conf'];
  }
  exec() {
    return getApiVersion()
      .then((apiVersion) => this.store.set({apiVersion}));
  }     
}

export default ApiVersionJob;