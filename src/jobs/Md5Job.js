import Job from './Job.js'
import { getAppMd5 } from '../rest/LocalConnection.js'

class Md5Job extends Job {
  constructor(store) {
    super();
    this.store = store;
    this.id = 'md5';
    this.dependsOn = [];
  }
  exec() {
    return getAppMd5()
      .then(appMd5 => this.store.set({appMd5}));
  }     
}

export default Md5Job;