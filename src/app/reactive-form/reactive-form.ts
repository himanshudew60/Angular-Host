import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';

/* Angular Material imports */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

/* SweetAlert2 */
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z]+$/)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z]+$/)
    ]),
    price: new FormGroup({
      currency: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required)
    }),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    gender: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    Swal.fire({
      title: 'Success!',
      html: `
        <div style="text-align:left;">
          <p><strong>First Name:</strong> ${this.userForm.value.firstName}</p>
          <p><strong>Last Name:</strong> ${this.userForm.value.lastName}</p>
          <p><strong>Price:</strong> ${this.userForm.value.price?.currency} ${this.userForm.value.price?.value}</p>
          <p><strong>Mobile:</strong> ${this.userForm.value.mobile}</p>
          <p><strong>Email:</strong> ${this.userForm.value.email}</p>
          <p><strong>Gender:</strong> ${this.userForm.value.gender}</p>
        </div>
      `,
      icon: 'success',
      confirmButtonColor: '#28a745'
    });

    this.userForm.reset();
  }

  getError(control: AbstractControl | null): string {
    if (!control || !control.touched) return '';
    if (control.errors?.['required']) return 'This field is required';
    if (control.errors?.['minlength'])
      return `Minimum ${control.errors['minlength'].requiredLength} characters required`;
    if (control.errors?.['pattern']) {
      if (control === this.userForm.get('mobile')) return 'Enter a valid 10-digit number';
      return 'Only alphabets allowed';
    }
    if (control.errors?.['email']) return 'Invalid email format';
    return '';
  }

}
