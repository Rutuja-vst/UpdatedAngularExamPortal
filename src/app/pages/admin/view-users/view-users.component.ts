import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewUserService } from '../../../services/view-user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserExamDetailsComponent } from '../user-exam-details/user-exam-details.component';
import { QuizService } from 'src/app/services/quiz.service';
import { CategoryService } from 'src/app/services/category.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent implements OnInit {
  selectedStatus = 'All';

  displayedColumns: string[] = ['id', 'userName', 'firstName' ,'email','assignedQuiz', 'marks', 'status', 'update', 'delete'];
  users: any;
  srcResult: any;
   filteredUsers: any[] = [];
  data :[][];
  categories:[];
  passThreshold: number = 0.06;
  // filteredUsers: any[] = []; // Initialize with the initial data
  fileName= 'ExcelSheet.xlsx';


@ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private usersData: ViewUserService,
    private _snak: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private location: Location,
    private _cat: CategoryService,


  ) {}

  ngOnInit() {

    // this._cat.categories().subscribe(
    //   (data: any) => {
        
    //     //categories load
    //     this.categories = data;
    //     // console.log(this.categories);
    //   },

    //   (error) => {
    //     console.log(error);
    //     Swal.fire('Error!!', 'error in loading data from server', 'error');
    //   }
    // );

    this.usersData.users().subscribe((data) => {
      console.log(data);
      this.users = new MatTableDataSource(data as any[]);
      // this.users = new MatTableDataSource(this.filteredUsers);

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

    this.users.filter = filterValue;
    // console.log(this.users.filter);
    if (filterValue === 'passed') {
      this.filteredUsers = this.users.data.filter(user => user.marks >= (this.passThreshold * 100));
      console.log(this.filteredUsers);
    } else if (filterValue === 'failed') {
      this.filteredUsers = this.users.data.filter(user => user.marks < (this.passThreshold * 100));
    } else {
      this.filteredUsers = this.users.data;

    }
   this.users.paginator.firstPage();

    // console.log(this.users.filter);
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


  exportUser(): void {
    let element = document.getElementById('excel-table');
  
    let tableHeaders = Array.from(element.getElementsByTagName('th'));
    // console.log(tableHeaders);
    tableHeaders.pop();
    // console.log(tableHeaders);
    let tableRows = Array.from(element.getElementsByTagName('tr'));
    tableRows.forEach((row) => {
      let lastCell = Array.from(row.getElementsByTagName('td')).pop();
      // console.log(lastCell);
      if (lastCell) {
        row.removeChild(lastCell);
      }
    });
  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  console.log(ws);
    //  generate workbook and add the worksheet 
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    //  save to file 
    XLSX.writeFile(wb, this.fileName);
  }
  
  

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