import { Component } from '@angular/core';
import { StudentsService } from './student-service/student-service.service';
import { Student } from './models/student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchedName: string = "";
  searchedTag: string = "";
  constructor(private studentsServ: StudentsService) {}

  ngOnInit(): void {
    this.studentsServ.getAllStudents().subscribe((std) => {
      this.students = std.students;
      this.filteredStudents = this.students;
      this.students.forEach((s) => {
        s.tags = [];
        s.details = false;
        //calculates the avg of each student
        s.avg = (s.grades.reduce((pv, cv) =>  Number(pv) + Number(cv), 0) / s.grades.length);
      });
    })
  }

  viewStudentDetails(i: number): void {
    this.filteredStudents[i].details = !this.filteredStudents[i].details
  }

  filter():void {
      this.filteredStudents = this.students.filter((std) => {
        return (
          (std.firstName.toLowerCase() + " " + std.lastName.toLowerCase()).includes(this.searchedName.toLowerCase())
        );
      })
    if(this.searchedTag) {
      this.filteredStudents = this.filteredStudents.filter(s => {
        return s.tags.join().toLowerCase().includes(this.searchedTag)
      })
    }
  }
  
  addTag(email:string, tag: Event):void {
    if(!(tag.target as HTMLInputElement).value.length) {
      return
    }
    const i = this.students.findIndex(s=>s.email==email);
    this.students[i].tags.push((tag.target as HTMLInputElement).value);
    (tag.target as HTMLInputElement).value = "";
  }

  getCharacter(i: number): string {
    return this.filteredStudents[i].details == true ? "-" : "+";
  }
}
