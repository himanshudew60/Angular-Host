import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

/* Angular Material imports */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JsonPipe,

    /* Material */
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './reactive-form.html',
  styleUrls: ['./reactive-form.css']
})
export class ReactiveForm {

  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required,Validators.minLength(5),Validators.pattern(/^[a-zA-Z]+$/)]),
    lastName: new FormControl('', [Validators.required,Validators.minLength(5),Validators.pattern(/^[a-zA-Z]+$/)]),

    price: new FormGroup({
      currency: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required)
    }),

    mobile: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]+$/)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    gender: new FormControl('',Validators.required),
  });


  onSubmit() {
    if (this.userForm.invalid) return;

    console.log(this.userForm.value);
  }
}
