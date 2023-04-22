export interface PaymentDTO {
  paymentId?: number,
  cardNumber: string,
  cardHolderName: string,
  payAmount: number,
  cardBrand: string,
  transactionId: number,
  paymentStatus: string,
  createdDate?: string
}
