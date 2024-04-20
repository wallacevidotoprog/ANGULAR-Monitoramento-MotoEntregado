import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { InputGenericComponent } from '../inputs/input-generic/input-generic.component';
import { InputButtonGenericComponent } from '../inputs/input-button-generic/input-button-generic.component';
import { InputDropdownGenericComponent } from '../inputs/input-dropdown-generic/input-dropdown-generic.component';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    InputGenericComponent,
    InputButtonGenericComponent,
    InputDropdownGenericComponent,
  ],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.css',
})
export class MaintenanceComponent {
  protected load = false;
  maintenance = new FormGroup({
    date: new FormControl(this.getDateNow()),
    plate: new FormControl('',Validators.required),
    km: new FormControl(),
    value: new FormControl(),
    type: new FormControl(),
    obs: new FormControl(),
  });
  send(): void {
    console.log(this.maintenance.value.date);
    this.load = true;
    setTimeout(() => {
      this.load = false;
    }, 5000);
  }

  getDateNow() {
    let today = new Date();
    let date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      today.getDate().toString().padStart(2, '0');
    let time =
      today.getHours().toString().padStart(2, '0') +
      ':' +
      today.getMinutes().toString().padStart(2, '0');
    return date + 'T' + time;
  }
}
