import { Component, Inject, OnInit } from '@angular/core';
import { ViewUserService } from '../../../services/view-user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-exam-details',
  templateUrl: './user-exam-details.component.html',
  styleUrls: ['./user-exam-details.component.css']
})
export class UserExamDetailsComponent implements OnInit {
  userExamDetails: any;
  Id:number;
  displayedColumns: string[] = ['quizName', 'attemptDate','status', 'marks'];
  userId: number;
  userName: string;
  passThreshold: number = 0.06;
  filteredUserExamDetails: any ;




  constructor(
    private examData: ViewUserService,
    private dialogRef: MatDialogRef<UserExamDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number }
  ) {}

  ngOnInit() {
    this.fetchUserExamDetails(this.data.userId);
    this.Id=this.data.userId;
    this.fetchUserDetails(this.Id);


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    if (filterValue === 'passed') {
      this.filteredUserExamDetails = this.userExamDetails.filter((exam: any) =>
        exam.marks >= this.passThreshold * 100
      );
    } else if (filterValue === 'failed') {
      this.filteredUserExamDetails = this.userExamDetails.filter((exam: any) =>
        exam.marks < this.passThreshold * 100
      );
    } else {
      this.filteredUserExamDetails = this.userExamDetails.filter((exam: any) =>
        exam.quizName.toLowerCase().includes(filterValue)
      );
    }
  }
  
  


  fetchUserExamDetails(userId: number) {
    this.examData.getUserExamDetails(userId).subscribe(
      (data) => {
        this.userExamDetails = data;
        this.filteredUserExamDetails = data; // Assign the data to filteredUserExamDetails as well

      },
      (error) => {
        console.error('Failed to fetch user exam details:', error);
      }
    );
  }

  fetchUserDetails(userId: number) {
    this.examData.getuser(userId).subscribe(
      (data) => {
        // this.userName = data.email; 
      },
      (error) => {
        console.error('Failed to fetch user details:', error);
      }
    );
  }
}
