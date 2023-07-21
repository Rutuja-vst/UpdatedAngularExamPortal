import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewUserService } from 'src/app/services/view-user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../user/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _user: ViewUserService,
    private _router: Router,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    public dialogRef: MatDialogRef<UpdateUserComponent>, // Inject MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  id:any;
  user:any;
  users:any[];
  userData:User=new User();

  ngOnInit(): void {
     
      this.id=this.data.id;
      // console.log(this.id);
     
    this._user.getuser(this.id).subscribe(
      (data: any) => {
        this.user = data;
        // console.log(this.user);
        // alert(this.user.userName)

      },
      (error) => {
        console.log(error);
      }
    );

    this._user.users().subscribe(
      (data: any) => {
        this.users = data;
        // console.log(this.user);
      },
      (error) => {
        alert('error in loading categories');
      }
    );
  }

  // //update form submit
  public updateUser() {
    // console.log(this.user);
    this.userData.id=this.user.id;
    this.userData.username=this.user.username;
    this.userData.firstName=this.user.firstName;
    this.userData.lastName=this.user.lastName;
    this.userData.email=this.user.email;
    this.userData.phone=this.user.phone;
    this.userData.password=this.user.password;
    // console.log(this.userData)

    this._user.updateUser(this.userData).subscribe((data)=>{
      Swal.fire('Success ', 'USERDATA updated.', 'success')
      .then(function () {
        window.location.reload();
      });
      ;
      
    },
    (error) => {
      Swal.fire('Error', 'Error in UPDATING user', 'error');
      window.location.reload();
    });

  //   event.preventDefault();


  //  // validatate
  //   // console.log(this.user);
  //   if (this.user.username == '' || this.user.username == null) {
  //     // alert('User is required !!');
  //     this.snack.open('Username is required !! ', '', {
  //       duration: 1000,
  //     });
  //     return;
  //   }

  //   if (this.user.password == '' || this.user.password == null) {
  //     // alert('User is required !!');
  //     this.snack.open('Password is required !! ', '', {
  //       duration: 3000,
  //     });
  //     return;
  //   }
  //   this._user.updateUser(this.user).subscribe(
  //     (data) => {
  //       // console.log(this.user);
  //       ale("alo me ithe");
  //       Swal.fire('Success !!', 'User updated', 'success').then((e) => {
  //         // this._router.navigate(['']);
  //         this.dialogRef.close();

  //       });
  //     },
  //     (error) => {
  //       Swal.fire('Error', 'error in updating user', 'error');
  //       console.log(error);
  //     }
  //   );
  //   this._user.updateUser
  }
//   formSubmit() {
//     console.log(this.user);
//     if (this.user.username == '' || this.user.username == null) {
//       // alert('User is required !!');
//       this.snack.open('Username is required !! ', '', {
//         duration: 3000,
//       });
//       return;
//     }

//     if (this.user.password == '' || this.user.password == null) {
//       // alert('User is required !!');
//       this.snack.open('Password is required !! ', '', {
//         duration: 3000,
//       });
//       return;
//     }
// }
}
