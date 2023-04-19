import {EmailHistory} from "@app/core/model/email-history.model";

export class EmailHistoryPage{
  private readonly _emailHistory: EmailHistory[];
  private readonly _totalPage: number;
  private readonly _totalItem: number;
  constructor(emailHistory: EmailHistory[], totalPage: number, totalItem: number) {
    this._emailHistory = emailHistory;
    this._totalPage = totalPage;
    this._totalItem = totalItem;
  }
  get emailHistory(): EmailHistory[] {
    return this._emailHistory;
  }

  get totalPage(): number {
    return this._totalPage;
  }

  get totalItem(): number {
    return this._totalItem;
  }
}
