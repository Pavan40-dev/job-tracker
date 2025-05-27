import { Injectable } from '@angular/core';
import { Job } from '../models/job.model';

@Injectable({ providedIn: 'root' })
export class JobService {
  private key = 'jobs';

  getJobs(): Job[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  saveJobs(jobs: Job[]) {
    localStorage.setItem(this.key, JSON.stringify(jobs));
  }

  addJob(job: Job) {
    const jobs = this.getJobs();
    jobs.push(job);
    this.saveJobs(jobs);
  }

  deleteJob(id: string) {
    const jobs = this.getJobs().filter((j) => j.id !== id);
    this.saveJobs(jobs);
  }

  updateJob(updatedJob: Job) {
    const jobs = this.getJobs().map((j) =>
      j.id === updatedJob.id ? updatedJob : j
    );
    this.saveJobs(jobs);
  }

  getJobById(id: string): Job | undefined {
    return this.getJobs().find((j) => j.id === id);
  }
}
