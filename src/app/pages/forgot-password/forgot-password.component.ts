import { Component, OnInit } from '@angular/core';
import { VerifyOTPComponent } from '../verify-otp/verify-otp.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    email:String;
  constructor(    private dialog :MatDialog,
    private _user:UserService,

    ) { }

  ngOnInit(): void {
  }

  
sendOTP(){
  console.log(this.email);
  
}
  openVerifyOTP(){
    this.dialog.open(VerifyOTPComponent ,{
      width:'40%',
      height:'300px'
    })
  }
}
