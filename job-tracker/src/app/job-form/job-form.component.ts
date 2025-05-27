import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { v4 as uuidv4 } from 'uuid';
import { JobService } from '../services/job.service';
import { Job } from '../models/job.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  imports: [FormsModule],
})
export class JobFormComponent implements OnInit {
  job: Job = { id: '', company: '', position: '', status: 'applied', date: '' };
  isEdit = false;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const existing = this.jobService.getJobById(id);
      if (existing) {
        this.job = { ...existing };
        this.isEdit = true;
      }
    }
  }

  saveJob() {
    if (this.isEdit) {
      this.jobService.updateJob(this.job);
    } else {
      this.job.id = uuidv4();
      this.jobService.addJob(this.job);
    }
    this.router.navigate(['/']);
  }
}
