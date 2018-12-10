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

function runJob(jobId) {
  return jobs.find(job => job.id === jobId).run();
}

let interval;

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
  start, stop, addJob, runJob
}