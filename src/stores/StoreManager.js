let interval;
const jobs = []

function runnableJobs() {
  return jobs.filter(job => job.canRun(okJobIds()));
}

function okJobIds() {
  return jobs
    .filter(job => job.status === 'Ok')
    .map(job => job.id);
}

function runJobs() {
  runnableJobs().forEach( (job) => {
    job.run();
  });
}

function start() {
  interval = setInterval(runJobs, 100);
}

function stop() {
  clearInterval(interval);
}

function addJob(job) {
  jobs.push(job);
}

start();

export {
  start, stop, addJob
}