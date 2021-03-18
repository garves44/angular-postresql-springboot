import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application.model';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.css']
})
export class AddApplicationComponent implements OnInit {
  application: Application = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
  }

  saveApplication(): void {
    const data = {
      title: this.application.title,
      description: this.application.description
    };

    this.applicationService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newApplication(): void {
    this.submitted = false;
    this.application = {
      title: '',
      description: '',
      published: false
    };
  }

}
