import Job from './Job.js'
import { getConnectionState } from '../rest/OctoConnection.js';

class ConnectionStateJob extends Job {
  constructor(store) {
    super();
    this.store = store;
    this.id = 'connectionState';
    this.dependsOn = ['conf', 'apiVersion'];
  }
  exec() {
    return getConnectionState()
      .then((connectionState) => this.store.set({connectionState}));
  }     
}

export default ConnectionStateJob;
