class Job {
  constructor(id, dependsOn, exec){
    this.id = id;
    this.dependsOn = dependsOn;
    this.exec = exec;
    this.lastRun = 0;
    this.status = 'Unknown'
  }
  run() {
    this.lastRun = Date.now();
    return this.exec()
      .then( () => this.status = 'Ok')
      .catch( (e) => { 
        this.status = 'Error';
        this.lastError = e;
      });
  }
  timeSinceRun() {
    return Date.now() - this.lastRun 
  }
  canRun(okJobIds) {
    if( this.timeSinceRun() < 5000 ) {
      return false;
    }
    return this.dependsOn.filter( id => !okJobIds.includes(id) ).length == 0;
  }
}

export default Job;