import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postUser(data: any) {
    return this.http.post<any>("https://mockend.com/safaldas/mock-api/users", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getUser(limit: any, offset: number, search_value: string) {

    let url = "https://mockend.com/safaldas/mock-api/users?limit=" + limit + "&offset=" + offset;

    if (search_value) {
      url = url + "&name_contains=" + search_value;
    }

    return this.http.get<any>(url)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updateUser(data: any, id: number) {
    return this.http.put<any>("https://mockend.com/safaldas/mock-api/users/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteUser(id: number) {
    return this.http.delete<any>("https://mockend.com/safaldas/mock-api/users/" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getUserById(id:any) {
    return this.http.get<any>("https://mockend.com/safaldas/mock-api/users/"+id)
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
