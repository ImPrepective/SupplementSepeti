import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  Form,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { from, Observable } from 'rxjs';
import { County } from 'src/app/models/county';
import { Category } from 'src/app/models/category';
import { CountyService } from 'src/app/services/county.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  counties: County[] = [];
  categories: Category[] = [];
  productAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService,
    private countyService: CountyService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.createProductAddForm();
    this.countyService.getCaunties().subscribe((response) => {
      this.counties = response.data;
    });
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }
  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ['', Validators.required],
      unitPrice: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      categoryId: ['', Validators.required],
      countyId: ['', Validators.required],
    });
  }
  add(){
    if(this.productAddForm){
      let productModel = Object.assign({},this.productAddForm.value);
      console.log(productModel);
      this.productService.add(productModel).subscribe(data => {
        console.log(data);
        this.toastrService.success("Urun eklendi","basarili");
      })
    }
    else{
      this.toastrService.error("Formunuz eksik","dikkat");
    }
  }
}
