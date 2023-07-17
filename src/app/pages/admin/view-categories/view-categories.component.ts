import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute,Router  } from '@angular/router';



@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  categories = [];

  constructor(
    private _category: CategoryService,
    private _route: ActivatedRoute,
    private _router: Router,
    private location:Location,
    private _snak: MatSnackBar

    ) {}

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        //css
        this.categories = data;
        console.log(this.categories);
      },

      (error) => {
        //
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }
  goBack() {
    this.location.back();
  }

  //delete category
  deleteCategory(cid) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure , want to delete this category?',
    }).then((result) => {
      if (result.isConfirmed) {
        //confim
        this._category.deleteCategory(cid).subscribe(
          (data) => {
            this._snak.open('category Deleted ', '', {
              duration: 3000,
            });
            this.categories = this.categories.filter((c) => c.cid != cid);
          },

          (error) => {
            this._snak.open('Error in deleting category', '', {
              duration: 3000,
            });
            console.log(error);
          }
        );
      }
    });
  }
  viewQuiz(categoryId:number){
    this._router.navigate(['/admin/categories/' , categoryId]);
  }
}
