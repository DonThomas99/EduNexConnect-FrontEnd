import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { IMat, IMatAsmnt } from 'src/app/Models/material';
import { selectClassNum, selectSubjectId, selectTenantId } from 'src/app/states/school/school.selector';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { StudentInfo } from 'src/app/Models/student';
import { AllSubmissions, submissions } from 'src/app/Models/common';
import { ToastrService } from 'ngx-toastr';

@Component({
 selector: 'app-teacher-grades',
 templateUrl: './teacher-grades.component.html',
 styleUrls: ['./teacher-grades.component.css']
})
export class TeacherGradesComponent implements OnInit {
 AssignmentArray: IMatAsmnt[] = [];
 selectedOption: string = 'All';
 currentPage: number = 1;
 itemsPerPage: number = 4;
 totalPages: number = 0;
 totalItems: number = 0;
 tenantId!: string;
 subjectId!: string;
 classNum!: string;
 submissions!: submissions[];
 studentData!: StudentInfo[];
 gradesByAssignment: { [assignmentId: string]: { [studentEmail: string]: string } } = {};

 tenantId$ = this.store.select(pipe(selectTenantId));
 subjectId$ = this.store.select(pipe(selectSubjectId));
 classNum$ = this.store.select(pipe(selectClassNum));

 constructor(
    private readonly store: Store,
    private readonly teacherService: TeacherServiceService,
    private readonly toastr: ToastrService
 ) {}

 ngOnInit(): void {
    this.tenantId$.subscribe((id) => {
      if (id) this.tenantId = id;
    });

    this.subjectId$.subscribe((id) => {
      if (id) this.subjectId = id.subjectId as string;
    });

    this.classNum$.subscribe((id) => {
      if (id) {
        this.classNum = id.classNum as string;
        console.log(this.classNum);
      }
    });

    this.teacherService.fetchStudents(this.tenantId, this.classNum).subscribe({
      next: (res: StudentInfo[]) => {
        this.studentData = res;
      }
    });

    this.teacherService.fetchAssignment(this.tenantId, this.subjectId, this.currentPage).subscribe({
      next: (res: IMat) => {
        this.AssignmentArray = res.Mat;
        this.totalItems = res.count;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      }
    });

    this.teacherService.fetchAllSubmissions(this.tenantId, this.subjectId).subscribe({
      next: (res: AllSubmissions) => {
        this.submissions = res.submissions;
        this.processSubmissions();
      },
      error: (res: AllSubmissions) => {
        const message = res.message;
        this.toastr.error(message);
      }
    });
 }

 processSubmissions() {
  
    this.submissions.forEach(submission => {
      if (!this.gradesByAssignment[submission.assignmentId]) {
        this.gradesByAssignment[submission.assignmentId] = {};
      }
      this.gradesByAssignment[submission.assignmentId][submission.studentEmail] = submission.grade;
    });
    console.log(this.gradesByAssignment);
    
 }

 fetchAssignments(page: number) {
    this.teacherService.fetchAssignment(this.tenantId, this.subjectId, page).subscribe({
      next: (res: IMat) => {
        this.AssignmentArray = [];
        this.AssignmentArray = res.Mat;
      }
    });
 }

 previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchAssignments(this.currentPage);
    }
 }

 nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchAssignments(this.currentPage);
    }
 }
}
