import { Component, OnInit,Inject  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  constructor(private userService: UserService,
     private snack: MatSnackBar,
     public dialogRef: MatDialogRef<AddUserComponent>, // Inject MatDialogRef
     @Inject(MAT_DIALOG_DATA) public data: any
     ) {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null ) {
      // alert('User is required !!');
      this.snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (this.user.password == '' || this.user.password == null) {
      // alert('User is required !!');
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }
    if (this.user.firstName == '' || this.user.firstName == null ) {
      this.snack.open('Firstname is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    //validate

    //addUser: userservice
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        //success
        console.log(data);
        //alert('success');
        Swal.fire('Successfully done !!', 'User id is ' + data.id, 'success');
      },
      (error) => {
        //error
        console.log(error);
        // alert('something went wrong');
        this.snack.open(error.error.text, '', {
          duration: 3000,
        });
      }
    );
  }
}