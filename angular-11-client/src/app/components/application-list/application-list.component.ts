import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application.model';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-applications-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationsListComponent implements OnInit {
  applications?: Application[];
  currentApplication?: Application;
  currentIndex = -1;
  title = '';

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.retrieveApplications();
  }

  retrieveApplications(): void {
    this.applicationService.getAll()
      .subscribe(
        data => {
          this.applications = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveApplications();
    this.currentApplication = undefined;
    this.currentIndex = -1;
  }

  setActiveApplication(application: Application, index: number): void {
    this.currentApplication = application;
    this.currentIndex = index;
  }

  removeAllApplications(): void {
    this.applicationService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.currentApplication = undefined;
    this.currentIndex = -1;

    this.applicationService.findByTitle(this.title)
      .subscribe(
        data => {
          this.applications = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
