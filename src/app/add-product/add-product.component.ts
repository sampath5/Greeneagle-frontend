import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';
import { GuardGuard } from '../service/guard/guard.guard';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  itemForm: any
  addItem: any;
  imgURL: any
  base64output: any
  constructor(
    public checkAuthService: GuardGuard,
    public router: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.addItem = new Product(0, "", "", "", "", 0, false, "", 0, "");
  }

  ngOnInit(): void {
    if (!this.checkAuthService.isAdmin()) {
      this.router.navigate(['']);
    }
    this.itemForm = this.fb.group({
      name: new FormControl("", [Validators.required]),
      model: new FormControl("", [Validators.required]),
      quantity: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
      brand: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      image: new FormControl("", [Validators.required])
    });
  }


  onSubmit() {
    console.log(this.itemForm)
    this.addItem.productName = this.itemForm.get('name').value;
    this.addItem.model = this.itemForm.get('model').value;
    this.addItem.quantity = this.itemForm.get('quantity').value;
    this.addItem.description = this.itemForm.get('description').value;
    this.addItem.price = this.itemForm.get('price').value;
    this.addItem.category=this.itemForm.get('category').value
    this.addItem.brand=this.itemForm.get('brand').value
    this.addItem.active=true
    this.addItem.primaryImage = this.imgURL
    console.log(this.addItem);

    this.productService.addProduct(this.checkAuthService.getToken(), this.addItem).subscribe(data => {
      console.log(data);
      this.router.navigate(['viewProducts']);
    });

  }

  fileChangeEvent(fileInput: Event | any) {

    console.log((<HTMLInputElement>fileInput.target).files[0])
    // const reader = new FileReader();

    // let some=(<HTMLInputElement>fileInput.target).files?.[0];
    if (fileInput.target.files) {
      //   // console.log((<HTMLInputElement>fileInput.target).files[0])
      let reader = new FileReader();

      reader.readAsDataURL(fileInput.target.files[0]);
      console.log(reader)
      reader.onload = (e) => {
        this.imgURL = reader.result;[]
        this.imgURL = this.imgURL.split(',')[1]
      };
    }

  }

}
