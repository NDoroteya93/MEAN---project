import { Injectable } from '@angular/core';
import { Http, Request, RequestOptions, RequestMethod, Response } from '@angular/http';
import { contentHeaders } from '../../../_helpers';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth/auth.service';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  private baseUrl = environment.apiUrl;
  constructor(
    private http: Http,
    private auth: AuthService
  ) {
  }

  get(url: string) {
    return this.request(url, RequestMethod.Get);
  }

  post(url: string, body: Object) {
    return this.request(url, RequestMethod.Post, body);
  }

  put(url: string, body: Object) {
    return this.request(url, RequestMethod.Put, body);
  }

  delete(url: string) {
    return this.request(url, RequestMethod.Delete);
  }

  request(url: string, method: RequestMethod, body?: Object) {
    // tslint:disable-next-line:no-debugger
    debugger;
    const headersRequest = contentHeaders;
    headersRequest.set('Authorization', `${this.auth.getToken()}`);
    // contentHeaders.set('Authorization', null);

    // contentHeaders.set('Authorization', `${this.auth.getToken()}`);

    const requestOptions = new RequestOptions({
      url: `${this.baseUrl}/${url}`,
      method: method,
      headers: headersRequest
    });

    if (body) {
      requestOptions.body = body;
    }

    const request = new Request(requestOptions);

    return this.http.request(request)
      .map((res: Response) => {
        console.log(res);
        return res.json();
      })
      .catch((res: Response) => this.onRequestError(res));
  }

  onRequestError(res: Response) {
    const statusCode = res.status;
    const body = res.json();

    const error = {
      statusCode: statusCode,
      error: body.error
    };

    console.log(error);

    return Observable.throw(error);
  }

}
