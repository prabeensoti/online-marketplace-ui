import { FormGroup } from "@angular/forms";
import { PageRequest, StatusModel } from "./core.model";
import { HttpParams } from "@angular/common/http";

export class CoreUtil {

    static loadingStatusModel(isLoading: boolean, message: string = ''): StatusModel {
        const statusModel = { loading: isLoading, hasError: false, message: message };
        return statusModel;
    }

    static responseStatusModel(isSuccess: boolean, message: string = ''): StatusModel {
        message = !!message ? message : isSuccess ? 'Success' : 'Something wrong';
        const statusModel = { loading: false, hasError: !isSuccess, message: message };
        return statusModel;
    }

    static ConfirmedValidator(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors["confirmedValidator"]) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

    static buildPageParams = (pageRequest: PageRequest): HttpParams => {
        return new HttpParams()
            .set('page', (pageRequest.page).toString())
            .set('size', pageRequest.size.toString())
            .set('sort', pageRequest.sort.toString() + ',' + pageRequest.direction.toString());
    }

}