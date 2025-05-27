import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, NgxChartsModule],
})
export class DashboardComponent implements OnInit {
  data: any[] = [];
  view: [number, number] = [600, 400];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    const jobs = this.jobService.getJobs();
    const countByStatus: any = {};
    jobs.forEach(
      (job) =>
        (countByStatus[job.status] = (countByStatus[job.status] || 0) + 1)
    );
    this.data = Object.keys(countByStatus).map((status) => ({
      name: status,
      value: countByStatus[status],
    }));
  }
}
