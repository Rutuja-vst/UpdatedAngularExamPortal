import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
cid:any;
category:any;
  constructor(  private _route: ActivatedRoute,
      private _category: CategoryService,
      private _router: Router,

    ) { }

  ngOnInit(): void {
    this.cid = this._route.snapshot.params.qid;
    // alert(this.qId);
    this._category.getCategory(this.cid).subscribe(
      (data: any) => {
        this.category = data;
        console.log(this.category);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public updateCategory(){
    this._category.updateCategory(this.category).subscribe(
      (data) => {
        Swal.fire('Success !!', 'category updated', 'success').then((e) => {
          this._router.navigate(['/admin/categories']);
        });
      },
      (error) => {
        Swal.fire('Error', 'error in updating quiz', 'error');
        console.log(error);
      }
    );
  }
}
