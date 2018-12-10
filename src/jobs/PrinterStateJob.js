
import Job from './Job.js'
import { getPrinterState } from '../rest/OctoConnection.js';

class PrinterStateJob extends Job {
  constructor(store) {
    super();
    this.store = store;
    this.id = 'printerState';
    this.dependsOn = ['conf', 'connectionState', 'apiVersion'];
  }
  exec() {
    return getPrinterState('history=true&limit=1000')
      .then(printerState => this.store.set({printerState}));
  }     
}

export default PrinterStateJob;