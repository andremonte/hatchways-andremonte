import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  url: string = "https://api.hatchways.io/assessment/students";
  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<{students: Student[]}> {
    return this.http.get<{students: Student[]}>(this.url);
  }
}
