import { FormGroup } from "@angular/forms";
import { PageRequest } from "./core.model";
import { HttpParams } from "@angular/common/http";

export class CoreUtil {

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
            .set('page', (pageRequest.page - 1).toString())
            .set('size', pageRequest.size.toString())
            .set('sort', pageRequest.sort.toString() + ',' + pageRequest.direction.toString());
    }

}