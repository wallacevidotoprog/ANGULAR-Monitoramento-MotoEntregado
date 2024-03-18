import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  title: string = 'LOGIN';
  email = document.getElementById('email');
  password = document.getElementById('password');

  async Login(): Promise<void> {
    await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: email.value,
        pass: password.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        document.cookie = data.TK;
        window.location.href = '/pages/home/home.html';
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
