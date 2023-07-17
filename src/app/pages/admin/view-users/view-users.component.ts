import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewUserService } from '../../../services/view-user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { MatTableDataSource } from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserExamDetailsComponent } from '../user-exam-details/user-exam-details.component';
// import * as XLSX from 'xlsx';


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'userName', 'firstName' ,'email','assignedQuiz', 'marks', 'status', 'update', 'delete'];
  users: any;
  srcResult: any;
  filteredUsers: any[] = [];
  data :[][];
  passThreshold: number = 0.06;


@ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(
    private usersData: ViewUserService,
    private _snak: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.usersData.users().subscribe((data) => {
      console.log(data);
      this.users = new MatTableDataSource(data as any[]);
      this.filteredUsers = [...this.users.data]; // Initialize filteredUsers with the original users
      this.users.paginator =this.paginator;

    });
  }

  deleteUser(id) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure you want to delete this User?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersData.deleteUser(id).subscribe(
          (data) => {
            this._snak.open('User Deleted', '', {
              duration: 3000,
            });
            this.users = this.users.filter((u) => u.id !== id);
            this.filteredUsers = this.filteredUsers.filter((u) => u.id !== id);

          },
          (error) => {
            this._snak.open('Error in deleting user', '', {
              duration: 3000,
            });
            console.log(error);
          }
        );
      }
      window.location.reload()

    });
  }

// Search for the specific field
  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

  //   this.users.filter = filterValue;
    if (filterValue === 'passed') {
      this.users.filteredData = this.users.data.filter(user => user.marks >= (this.passThreshold * 100));
    } else if (filterValue === 'failed') {
      this.users.filteredData = this.users.data.filter(user => user.marks < (this.passThreshold * 100));
    } else {
      this.users.filteredData = this.users.data;
    }
  
    this.users.paginator.firstPage();
    // console.log(filterValue);
    console.log(this.users.filter);
}

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  //   this.filteredUsers = this.users.filter((user) => {
  //     return (
  //       user.userName.toLowerCase().includes(filterValue) ||
  //       user.firstName.toLowerCase().includes(filterValue) ||
  //       user.lastName.toLowerCase().includes(filterValue) ||
  //       user.email.toLowerCase().includes(filterValue) ||
  //       user.phone.toLowerCase().includes(filterValue)
  //     );
  //   });
  //}

// show the form to add single user
  addUserPopup() {
    this.dialog.open(AddUserComponent, {
      width: '60%',
    });
  }
// show the update user form
  updateUserPopup(idNumber: any) {
    alert(idNumber);
    this.dialog.open(UpdateUserComponent, {
      data: { id: idNumber },
      width: '60%',
    });
  }
//show the exam details of user
openUserExamDetails(userId: number) {
  const dialogRef = this.dialog.open(UserExamDetailsComponent, {
    data: { userId: userId },
    width: '55%',
  });
  dialogRef.afterClosed().subscribe(() => {
    // Reload the users after closing the dialog
    // this.fetchUsers();
  });
}
}
