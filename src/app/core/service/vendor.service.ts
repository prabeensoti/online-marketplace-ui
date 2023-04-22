import { Injectable } from '@angular/core';
import { GenericFilterRequest, PageRequest, PageableResponse } from '../core.model';
import { VendorDTO } from '../model/domain.model';
import { Observable, catchError, throwError } from 'rxjs';
import { CoreUtil } from '../core.util';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiEndpoints } from '../app-url.constant';
import { VendorRegistrationContext } from '@app/auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  readonly API_ENDPOINT = ApiEndpoints.API_URL;

  constructor(private http: HttpClient) {
  }

  public getAllVendors(pageRequest: PageRequest): Observable<PageableResponse<VendorDTO[]>> {
    const VendorsObservable: Observable<PageableResponse<VendorDTO[]>> = this.http.get<PageableResponse<VendorDTO[]>>(ApiEndpoints.VENDORS.ALL, {
      params: CoreUtil.buildPageParams(pageRequest)
    }).pipe(catchError(this.errorHandler));
    return VendorsObservable;
  }

  getVendorById(id: number): Observable<VendorDTO> {
    const VendorObservable: Observable<VendorDTO> = this.http.get<VendorDTO>(ApiEndpoints.VENDORS.GET_BY_ID + '/' + id);
    return VendorObservable;
  }

  updateVendor(id: number, Vendor: VendorDTO): Observable<VendorDTO> {
    const VendorDTO = { ...Vendor, id };
    const allVendorsObservable: Observable<VendorDTO> = this.http.put<VendorDTO>(ApiEndpoints.VENDORS.UPDATE, VendorDTO);
    return allVendorsObservable;
  }

  filterVendors(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<VendorDTO>): Observable<PageableResponse<Array<VendorDTO>>> {
    const options = {
      params: CoreUtil.buildPageParams(pageRequest)
    };
    return this.http
      .post<PageableResponse<Array<VendorDTO>>>(ApiEndpoints.VENDORS.FILTER, genericFilterRequest, options)
      .pipe(catchError(this.errorHandler));
  }

  verifyVendor(vendor: VendorDTO): Observable<VendorDTO> {
    return this.http.put<VendorDTO>(ApiEndpoints.VENDORS.VERIFY, vendor);
  }

  registerVendor(vendorRegistrationContext: VendorRegistrationContext): Observable<VendorDTO> {
    const vendorObservable: Observable<VendorDTO> = this.http.post<VendorDTO>(ApiEndpoints.AUTH.VENDOR_REGISTER, vendorRegistrationContext);
    return vendorObservable;
  }


  errorHandler(error: HttpErrorResponse): Observable<any> {
    console.log('Vendor api error ', error);
    // show toast notification
    return throwError(error);
  }

}
