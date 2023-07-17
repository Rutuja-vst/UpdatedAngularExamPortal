import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.css']
})
export class SetNewPasswordComponent implements OnInit {

  constructor(    public dialogRef: MatDialogRef<SetNewPasswordComponent>, // Inject MatDialogRef
  private dialog :MatDialog,
    private _user:UserService,
    private _route: ActivatedRoute,
    private _router: Router,

  ) { }

  username: string;
  password: string;
  user:any;

  ngOnInit(): void {
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
