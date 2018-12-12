import { Store } from 'svelte/store.js';
import { getApiVersion, getConnectionState, getOutputStates, getPrinterState, setOutputState, connectToPrinter, setTemp, getJobState, getPrinterProfiles } from '../rest/OctoConnection.js';
import { getConf, getAppMd5 } from '../rest/LocalConnection.js'

class AppDataStore extends Store {
  updateConf() {
    return getConf()
      .then(conf => this.set({conf}));
  }
  updateMd5() {
    return getAppMd5()
      .then(appMd5 => this.set({appMd5}));
  }
  updateApiVersion() {
    return getApiVersion()
      .then(apiVersion => this.set({apiVersion}));
  }
  updateConnectionState() {
    return getConnectionState()
      .then(connectionState => this.set({connectionState}));
  }
  updateOutputStates() {
    return getOutputStates()
      .then(outputStates => this.set({outputStates}));
  }
  updatePrinterState() {
    return getPrinterState('history=true&limit=1000')
      .then(printerState => this.set({printerState}));
  }
  updateJobState() {
    return getJobState()
      .then(jobState => this.set({jobState}));
  }
  updatePrinterProfiles() {
    return getPrinterProfiles()
      .then(printerProfiles => this.set({printerProfiles}));
  }
  setOutputState(id,state) {
    return setOutputState(id,state)
      .then(() => this.updateOutputStates());
  }
  killPower() {
    const killPromises = this.powerButtonIds().map( id => setOutputState(id,false));
    return Promise.all(killPromises)
      .then(() => this.updateOutputStates());
  }
  powerButtonIds() {
    return this.get().conf.powerButtons.map( p => p.apiId );
  }
  connectToPrinter() {
    return connectToPrinter()
      .then(() => this.updateConnectionState() );
  }
  setTemp(key,temp) {
    return setTemp(key,temp)
      .then(() => this.updatePrinterState() );
  }
}

const defaults = {
  activePrinterButton: 'JobInfo',
  conf: {
    powerButtons: [],
    temperatureControls: []
  },
  printerState: {
    temperature: {
      history: []
    },
    state: {
      flags: {

      }
    }
  },
  apiVersion: {

  },
  appMd5: {
    
  },
  connectionState: {
    current: {
      
    }
  },
  outputStates: [],
  jobState: {
    job: {
      file: {
        
      }
    },
    progress: {

    }
  },
  printerProfiles: {

  }
}

export default new AppDataStore(defaults);
