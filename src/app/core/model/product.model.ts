export class ProductModel {
  productId:number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  categoryId: number;
  images: FileList;

  constructor(productId: number, name: string, description: string, quantity: number, price: number, categoryId: number,images: FileList) {
    this.productId = productId;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
    this.categoryId = categoryId;
    this.images = images;
  }
}
