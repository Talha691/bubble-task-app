import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public tasksList: any[]= [];
  public taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    todo: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void 
  {
    this.getTasks();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const payload = {
        title: this.taskForm.get('title')?.value,
        todo: this.taskForm.get('todo')?.value,
        description: this.taskForm.get('description')?.value
      };
      
      this.http.post('http://localhost:3000/create-task', payload)
      .subscribe(
        (response: any) => {
          if (response && response.status === 'success')
          {
            this.getTasks()
          }
          console.log('API Response:', response);
        },
        error => {
          console.error('API Error:', error);
        }
      );
    } else {
      // Mark form controls as touched to display validation errors
      this.taskForm.markAllAsTouched();
    }
  }

  getTasks() {
    this.http.get('http://localhost:3000/gettasks')
      .subscribe(
        (response: any) => {
          if (response && response.message === 'success')
            response.data = this.tasksList;
            this.tasksList = response.data;
          },
        error => {
          console.error('API Error:', error);
        }
      );
  }
}  