import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { Job } from '../models/job.model';
import { saveAs } from 'file-saver';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  imports: [CommonModule, RouterModule],
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobs = this.jobService.getJobs();
  }

  deleteJob(id: string) {
    this.jobService.deleteJob(id);
    this.jobs = this.jobService.getJobs();
  }

  exportCSV() {
    const csv = this.jobs.map((j) => ({
      Company: j.company,
      Position: j.position,
      Status: j.status,
      Date: j.date,
    }));
    const blob = new Blob(
      [
        'Company,Position,Status,Date\n' +
          csv.map((row) => Object.values(row).join(',')).join('\n'),
      ],
      { type: 'text/csv;charset=utf-8;' }
    );
    saveAs(blob, 'job_applications.csv');
  }
}
