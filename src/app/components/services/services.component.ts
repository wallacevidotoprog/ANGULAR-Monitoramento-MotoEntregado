import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DeliveryService } from '../../service/delivery.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  @ViewChild('myalert') myalert!: ElementRef;

  private tAlert = inject(NgToastService);
  msgAlert = new ALERT();
  loading: boolean = false;
  _alert: boolean = false;

  dateToday: any;

  deliveryForm = new FormGroup({
    date: new FormControl(this.getDateNow(), Validators.required),
    value: new FormControl('', Validators.required),
    km: new FormControl('', Validators.required),
    router: new FormControl('', Validators.required),
    isDerivery: new FormControl('', Validators.required),
  });

  private apiDelivery = inject(DeliveryService);
  send() {
    if (!this.deliveryForm.valid) {
      this.tAlert.error({
        detail: 'ERRO',
        summary: 'Faltou preencher algo.',
        duration: 5000,
      });
      return;
    }
    this.loading = true;
    const deliveryData = new DeliveryData();

    deliveryData.date = this.deliveryForm.value.date;
    deliveryData.value = this.deliveryForm.value.value;
    deliveryData.km = this.deliveryForm.value.km;
    deliveryData.router = this.deliveryForm.value.router;

    switch (this.deliveryForm.value.isDerivery?.toString()) {
      case 'isRate':
        deliveryData.isRate = true;
        break;
      case 'isIfood':
        deliveryData.isIfood = true;
        break;
      case 'isManipulation':
        deliveryData.isManipulation = true;
        break;

      default:
        console.log('default');
        break;
    }
    this.apiDelivery.add(deliveryData).subscribe(
      (res) => {
        this.loading = false;
        this.deliveryForm.reset();
        this.tAlert.success({
          detail: 'Sucesso',
          summary: 'Registro cadastrado com sucesso.',
          duration: 5000,
        });
      },
      (error) => {
        this.loading = false;
        this.tAlert.error({
          detail: 'Erro ',
          summary: JSON.stringify(error),
          duration: 5000,
        });
      }
    );
  }

  SendMsgAlert(al: ALERT, _type: number) {
    this._alert = true;
    switch (_type) {
      case 0: //sucess
        al.n = 'green';
        break;
      case 1: //warn
        al.n = 'yellow';
        break;
      case 2: //error
        al.n = 'red';
        break;

      default:
        al.n = 'darkcyan';
        break;
    }
    this.msgAlert = al;
    setTimeout(() => {
      this._alert = false;
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

export class DeliveryData {
  date: Date | any;
  value: number | any;
  km: number | any;
  router: string | any;
  isRate: boolean = false;
  isIfood: boolean = false;
  isManipulation: boolean = false;
  // constructor(
  //   date: any,
  //   value: number,
  //   km: number,
  //   router: string,
  //   isRate: boolean,
  //   isIfood: boolean,
  //   isManipulation: boolean
  // ) {
  //   this.date = date;
  //   this.value = value;
  //   this.km = km;
  //   this.router = router;
  //   this.isRate = isRate;
  //   this.isIfood = isIfood;
  //   this.isManipulation = isManipulation;
  // }
}

export class ALERT {
  alert: string | any;
  msg: string | any;
  n: string | any;
  constructor(al: string = '', msg: string = '', n: string = '') {
    this.alert = al;
    this.msg = msg;
    this.n = n;
  }
}
