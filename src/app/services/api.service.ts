import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  productListEndPoint : string =  "http://localhost:3000/productList/";

  constructor(private http : HttpClient){

  }

  postProduct(data : any){
    return this.http.post<any>(this.productListEndPoint, data);
  }

  getProduct()
  {
    return this.http.get<any>(this.productListEndPoint);
  }

  updateProduct(data: any, productId: number)
  {
      return this.http.put<any>(this.productListEndPoint+productId,data);
  }

  deleteProduct(productId:number){
    return this.http.delete<any>(this.productListEndPoint+productId);
  }
}
