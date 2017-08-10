import { Headers } from '@angular/http';

export const contentHeaders = new Headers();
// contentHeaders.append('Access-Control-Allow-Origin', '*');
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
// tslint:disable-next-line:eofline
// contentHeaders.append('Authorization', null);