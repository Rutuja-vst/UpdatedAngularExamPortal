import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-uploadsheet',
  templateUrl: './uploadsheet.component.html',
  styleUrls: ['./uploadsheet.component.css']
})
export class UploadsheetComponent implements OnInit {
  file: File;
  userdata: any[][];

  constructor(private _http: HttpClient,
    private router: Router) {}

  ngOnInit(): void {}

  onFileChange(evt: any) {
    this.file = evt.target.files[0];
    console.log(evt);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      console.log(ws);

      this.userdata = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(this.userdata);
    };
    reader.readAsBinaryString(this.file);
  }

  uploadFile() {
    const formData: FormData = new FormData();
    formData.append('file', this.file);

    this._http.post('http://localhost:8080/user/userdata/uploadfile', formData).subscribe(
      (data) => {
        // Success
        console.log(data);

      },
      (error) => {
        console.log(error);
      }
    );
    this.router.navigate(['/admin']);
  }

}
