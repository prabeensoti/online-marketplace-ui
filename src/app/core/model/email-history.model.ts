export class EmailHistory{
  private readonly _mailType: string;
  private readonly _message: string;
  private readonly _subject: string;
  private readonly _fromEmail: string;
  private readonly _toEmail: string;
  private readonly _mailSendDateTime: string;
  constructor(mailType: string, message: string, subject: string, fromEmail: string, toEmail: string, mailSendDateTime: string){
    this._mailType = mailType;
    this._message = message;
    this._subject = subject;
    this._fromEmail = fromEmail;
    this._toEmail = toEmail;
    this._mailSendDateTime=mailSendDateTime;
  }

  get mailType(): string {
    return this._mailType;
  }

  get message(): string {
    return this._message;
  }

  get subject(): string {
    return this._subject;
  }

  get fromEmail(): string {
    return this._fromEmail;
  }

  get toEmail(): string {
    return this._toEmail;
  }

  get mailSendDateTime(): string {
    return this._mailSendDateTime;
  }
}
