import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CoursesService} from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: any[] = [
    {
      id: 1,
      name: "Mathematics 1",
    },
    {
      id: 1,
      name: "Mathematics 2",
    },
    {
      id: 1,
      name: "Mathematics 3",
    },
    {
      id: 1,
      name: "Mathematics 4",
    },
    {
      id: 1,
      name: "Mathematics 5",
    }];

    showSearchBox: boolean = false;

    constructor(private router: Router, private courseService: CoursesService) { }

  ngOnInit(): void {
      const url: string = this.router.url;
      this.courseService.getCourses().subscribe((courses: any[]) => this.courses = courses);
  }

}
