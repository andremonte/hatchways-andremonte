import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../models/student';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(students: Student[], searchNameTerm: string, searchTagTerm: string): Student[] {
    if(!students || (!searchNameTerm && !searchTagTerm)) {
      return students;
    }
    else {
      return students.filter(std => 
        ((std.firstName.toLowerCase() + " " + std.lastName.toLowerCase()).indexOf(searchNameTerm.toLowerCase()) !== -1)
        && (std.tags.join().toLowerCase().indexOf(searchTagTerm.toLowerCase()) !== -1)
        )
    }
  }

}
