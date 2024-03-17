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
          this.getTasks()
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
          console.log(response, "Response")
          if (response && response.message === 'success')
            response.data = this.tasksList;
            this.tasksList = response.data;
          },
        error => {
          console.error('API Error:', error);
        }
      );
  }

  onDelete(id: string) {
    console.log(id, "Task Id is");
    const options = 
    {
      body: { id: id } 
    };
    this.http.delete('http://localhost:3000/delete-task', options)
      .subscribe((response: any) => {
        console.log(response, "On Delete");
        this.getTasks();
      });
  }

}  