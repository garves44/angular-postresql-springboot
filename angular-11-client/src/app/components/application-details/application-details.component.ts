import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/models/application.model';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {
  currentApplication: Application = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getApplication(this.route.snapshot.params.id);
  }

  getApplication(id: string): void {
    this.applicationService.get(id)
      .subscribe(
        data => {
          this.currentApplication = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentApplication.title,
      description: this.currentApplication.description,
      published: status
    };

    this.message = '';

    this.applicationService.update(this.currentApplication.id, data)
      .subscribe(
        response => {
          this.currentApplication.published = status;
          console.log(response);
          this.message = response.message ? response.message : 'This application was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  updateApplication(): void {
    this.message = '';

    this.applicationService.update(this.currentApplication.id, this.currentApplication)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This application was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteApplication(): void {
    this.applicationService.delete(this.currentApplication.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/applications']);
        },
        error => {
          console.log(error);
        });
  }
}
