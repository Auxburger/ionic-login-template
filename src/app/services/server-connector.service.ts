import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class ServerConnectorService {
  private parameter: HttpParams;
  private readonly BASE_URL: string;

  constructor(protected http: HttpClient) {
    let host: string;
    let scheme: string;
    let port: number;
    this.clearParam();
    if (isDevMode()) {
      host = 'localhost';
      scheme = 'http';
    } else {
      host = 'your.domain.com';
      scheme = 'https';
    }
    port = 80;
    this.BASE_URL = this.getBaseURL(scheme, host, port);
  }

  /**
   * executes a get request whith a specific path 
   * @param path path of requested resource
   */
  public get<T>(path: string): Observable<T> {
    return this.http.get<T>(this.BASE_URL + path, { params: this.parameter });
  }

  public post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(this.BASE_URL + path, body, { params: this.parameter });
  }

  private getBaseURL(scheme: string, host: string, port: number) {
    return `${scheme}://${host}${port > 0 && port != 80 ? `:${port}` : ''}/`;
  }

  public clearParam() {
    this.parameter = new HttpParams();
  }

  public setParam(name: string, value: string) {
    this.parameter = this.parameter.set(name, value);
  }
}
