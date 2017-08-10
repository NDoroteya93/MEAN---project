import { Injectable } from '@angular/core';
import { Http, Request, RequestOptions, RequestMethod, Response } from '@angular/http';
import { contentHeaders } from '../../../_helpers';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(
    private http: Http,
    private auth: AuthService
  ) { }

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
    contentHeaders.append('Authorization', `Bearer ${this.auth.getToken()}`);

    const requestOptions = new RequestOptions({
      url: `${this.baseUrl}/${url}`,
      method: method,
      headers: contentHeaders
    });


    if (body) {
      requestOptions.body = body;
    }

    const request = new Request(requestOptions);

    return this.http.request(request)
      .map((res: Response) => res.json())
      .catch((res: Response) => this.onRequestError(res));
  }

  onRequestError(res: Response) {
    const statusCode = res.status;
    const body = res.json();

    const error = {
      statusCode: statusCode,
      error: body.error
    };

    return Observable.throw(error);
  }

}
