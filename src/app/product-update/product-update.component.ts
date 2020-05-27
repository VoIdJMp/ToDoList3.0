import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
  providers: [HttpService]
})

export class ProductUpdateComponent implements OnInit {

  productData: any = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getProductUpdate().subscribe( data => {
       this.productData = data;
    });
  }

}
