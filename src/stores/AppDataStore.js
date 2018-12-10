import { Store } from 'svelte/store.js';
import { getApiVersion, getConnectionState, getOutputStates, getPrinterState, setOutputState, connectToPrinter, setTemp } from '../rest/OctoConnection.js';
import { getConf, getAppMd5 } from '../rest/LocalConnection.js'

class AppDataStore extends Store {
  updateApiVersion() {
    return getApiVersion()
      .then((apiVersion) => this.set({apiVersion}));
  }
  updateConf() {
    return getConf()
      .then(conf => this.set({conf}));
  }
  updateConnectionState() {
    return getConnectionState()
      .then((connectionState) => this.set({connectionState}));
  }
  updateMd5() {
    return getAppMd5()
      .then(appMd5 => this.set({appMd5}));
  }
  updateOutputStates() {
    return getOutputStates()
      .then((outputStates) => this.set({outputStates}));
  }
  updatePrinterState() {
    return getPrinterState('history=true&limit=1000')
      .then(printerState => this.set({printerState}));
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
  outputStates: []
}

export default new AppDataStore(defaults);
