export class VendorProductSalesReportModel {
  private readonly _id: number;
  private readonly _productName: string;
  private readonly _quantity: number;
  private readonly _rate: number;
  private readonly _subTotal: number;
  private readonly _discount: number;
  private readonly _tax: number;
  private readonly _total: number;
  private readonly _purchaseDate: string;


  constructor(id: number, productName: string, quantity: number, rate: number, subTotal: number, discount: number, tax: number, total: number, purchaseDate: string) {
    this._id = id;
    this._productName = productName;
    this._quantity = quantity;
    this._rate = rate;
    this._subTotal = subTotal;
    this._discount = discount;
    this._tax = tax;
    this._total = total;
    this._purchaseDate = purchaseDate;
  }

  get id(): number {
    return this._id;
  }

  get productName(): string {
    return this._productName;
  }

  get quantity(): number {
    return this._quantity;
  }

  get rate(): number {
    return this._rate;
  }

  get subTotal(): number {
    return this._subTotal;
  }

  get discount(): number {
    return this._discount;
  }

  get tax(): number {
    return this._tax;
  }

  get total(): number {
    return this._total;
  }

  get purchaseDate(): string {
    return this._purchaseDate;
  }
}
