import { Store } from 'svelte/store.js';
import { getApiVersion, getConnectionState, getFiles, printFile, getOutputStates, 
  getPrinterState, setOutputState, connectToPrinter, setTemp, getJobState, 
  getPrinterProfiles, loadFile, startJob, restartJob, pauseJob, cancelJob } from '../rest/OctoConnection.js';
import { getConf, getAppMd5 } from '../rest/LocalConnection.js'
import loadSlices from '../helpers/LoadSlices.js';

class AppDataStore extends Store {
  updateConf() {
    return getConf()
      .then(conf => this.set({conf}));
  }
  updateMd5() {
    return getAppMd5()
      .then(appMd5 => this.set({appMd5}));
  }
  updateFiles() {
    return getFiles()
      .then(files => this.set({files}));
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
  printFile(name) {
    return printFile(name)
      .then(() => this.updateJobState());
  }
  loadFile(name) {
    return loadFile(name)
      .then(() => this.updateJobState());
  }
  startJob() {
    return startJob()
      .then(() => this.updateJobState());
  }
  restartJob() {
    return restartJob()
      .then(() => this.updateJobState());
  }
  cancelJob() {
    return cancelJob()
      .then(() => this.updateJobState());
  }
  pauseJob() {
    return pauseJob()
      .then(() => this.updateJobState());
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
  updateAnimationSlices() {
    const animationGeometryName = this.get().conf.animationGeometryName;
    if(!animationGeometryName) {
      return Promise.reject('animationGeometryName is not set');
    }
    return loadSlices(animationGeometryName)
      .then(animationSlices => this.set({animationSlices}));
    
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
      history: [],
      bed: {},
      tool0: {},
      tool1: {}
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
      completion: 0
    }
  },
  printerProfiles: {
    profiles: {
      _default: {
        volume: {}
      }
    }
  }
}

export default new AppDataStore(defaults);
