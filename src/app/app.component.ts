import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public taskForm = new FormGroup({
    title: new FormControl(''),
    todo: new FormControl(''),
    description: new FormControl('')
  })

  public tasks: any = [
    {number: 1, title: 'Task Title', todo: "todo", description: 'Description'}
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {}

  onSubmit() {
    if (this.taskForm.valid) {
      // Logic to handle form submission
      console.log(this.taskForm.value);
    } else {
      // Mark form controls as touched to display validation errors
      this.taskForm.markAllAsTouched();
    }
  }
}
