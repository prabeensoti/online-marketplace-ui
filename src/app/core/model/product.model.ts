export class ProductModel {
  productId:number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  categoryId: number;
  images: String[] | undefined;

  constructor(productId: number, name: string, description: string, quantity: number, price: number, categoryId: number,images?: String[]) {
    this.productId = productId;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
    this.categoryId = categoryId;
    this.images = images;
  }
}
