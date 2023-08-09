import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder, private _AppService: AppService, private router: Router) {
    if(localStorage.getItem('usuario')){
      this.router.navigate(['/inicio']);
    }
    this.form = this.fb.group({
      usuario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  iniciarSesion() {
    if (this.form.invalid) {
      return;
    }
    localStorage.setItem('usuario', `token_${Math.random() * 1000}`);
    this.router.navigate(['/inicio']);
    // this._AppService.login().subscribe((res: any) => {
    //   console.log(res);
    // })
  }

}
