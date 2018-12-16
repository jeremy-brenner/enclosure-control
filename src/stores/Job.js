class Job {
  constructor(id, dependsOn, exec){
    this.id = id;
    this.dependsOn = dependsOn;
    this.exec = exec;
    this.lastRun = 0;
    this.status = 'Unknown'
    this.running = false;
  }
  run() {
    this.running = true;
    return this.exec()
      .then( () => {
        this.status = 'Ok'
      })
      .catch( (e) => { 
        this.status = 'Error';
        this.lastError = e;
      })
      .then(() => {
        this.running = false;
        this.lastRun = Date.now();
      });
  }
  timeSinceRun() {
    return Date.now() - this.lastRun 
  }
  canRun(okJobIds) {
    if( this.running || this.timeSinceRun() < 5000 ) {
      return false;
    }
    return this.dependsOn.filter( id => !okJobIds.includes(id) ).length == 0;
  }
}

export default Job;