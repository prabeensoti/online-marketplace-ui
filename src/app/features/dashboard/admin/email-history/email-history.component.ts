import {Component, OnInit} from '@angular/core';
import {EmailHistory} from "@app/core/model/email-history.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EmailViewComponent} from "@app/features/dashboard/admin/email-history/email-view/email-view.component";
import {EmailHistoryService} from "@app/core/service/email-history.service";
import {ToastService} from "@app/core/service/toast.service";

@Component({
  selector: 'app-email-history',
  templateUrl: './email-history.component.html',
  styleUrls: ['./email-history.component.scss']
})
export class EmailHistoryComponent implements OnInit{
  page:number = 1;
  pageSize:number = 10;
  collectionSize: number = 0;
  emailHistories: EmailHistory[] | undefined;

  constructor(public modalService: NgbModal, public emailHistoryService: EmailHistoryService, public toastService: ToastService) {
  }

  ngOnInit(): void {
    this.refreshEmailHistory();
  }
  refreshEmailHistory(){
    this.emailHistoryService.getEmailHistoryPage(this.page,this.pageSize)
      .subscribe({next: (data)=>{
        console.log(data);
        this.emailHistories=data.emailHistory;
        this.collectionSize=data.totalItem;
      },error: (err) => {
        this.toastService.show(err.error.status+" "+err.error.message, { classname: 'bg-danger text-light fs-5', delay: 2000 });
      }});
  }

  open(emailHistory: EmailHistory):void {
    this.modalService.open(EmailViewComponent,{size: "lg"}).componentInstance.emailHistory = emailHistory;
  }
}
