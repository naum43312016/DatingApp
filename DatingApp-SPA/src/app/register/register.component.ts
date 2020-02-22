import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertyifyService } from '../_services/alertyify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  ageValid: boolean;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private authService: AuthService, private alertify: AlertyifyService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['',Validators.required],
      dateOfBirth: [null,Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(4),
        Validators.maxLength(12)]],
      confirmPassword: ['',Validators.required]
    }, {
      validators: [this.passwordMatchValidator]
    });
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value
    ? null : {'mismatch': true};
  }

  public getAge(dateOfBirth: Date) : number{
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const m = today.getMonth() - dateOfBirth.getMonth();
    if(m<0 || (m===0 && today.getDate() < dateOfBirth.getDate())){
      age--;
    }
    return age;
  }
  
  register(){
    var age = this.getAge(this.registerForm.get('dateOfBirth').value)
      if(age<18){
      this.alertify.error('You must be 18+');
      }else{
        if(this.registerForm.valid){
          this.user = Object.assign({}, this.registerForm.value);
          this.authService.register(this.user).subscribe(() => {
            this.alertify.success('Registration succesfull');
          },error =>{
            this.alertify.error(error);
          }, () => {
            this.authService.login(this.user).subscribe(() => {
              this.router.navigate(['/members']);
            });
          });
        }
      }
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }
}
