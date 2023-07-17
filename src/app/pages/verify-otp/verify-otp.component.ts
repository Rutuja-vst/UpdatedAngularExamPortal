import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { SetNewPasswordComponent } from '../set-new-password/set-new-password.component';


@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOTPComponent implements OnInit {

  constructor(    private dialog :MatDialog
    ) { }

  ngOnInit(): void {
  }
  openSetNewPassword(){
    this.dialog.open(SetNewPasswordComponent ,{
      width:'40%',
      height:'370px'
    })
  }
}
