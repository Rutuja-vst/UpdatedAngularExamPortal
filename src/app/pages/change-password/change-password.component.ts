import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SetNewPasswordComponent } from '../set-new-password/set-new-password.component';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private dialog :MatDialog,
    private _user:UserService,
    private _route: ActivatedRoute,
    private _router: Router,

    public dialogRef: MatDialogRef<ChangePasswordComponent>, // Inject MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: any
) { }
  username: string;
  password: string;
  user:any;
  ngOnInit(): void {

  //   this.username = this._route.snapshot.params.username;
  //    alert(this.username);
  //   this._user.getUser(this.username).subscribe(
  //     (data: any) => {
  //       this.user = data;
  //       console.log(this.user);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   ); 
   }
   openSetNewPassword(){
    this.dialog.open(SetNewPasswordComponent ,{
      width:'40%',
      height:'370px'
    })
  }
  public updatePassword() {
    //validatate
    console.log('Username:', this.username);
    console.log('Password:', this.password);


    this._user.updatePassword(this.username, this.password).subscribe(
      (data) => {
        Swal.fire('Success !!', 'user  password updated', 'success').then((e) => {
          this._router.navigate(['/login']);
        });
      },
      (error) => {
        Swal.fire('Error', 'error in updating userPassword', 'error');
      }
    );
  }
}

