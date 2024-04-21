export interface IAssignments{
_id:string;
subjectId:string;
teacherId:string;
assignmentTitle:string;
pdf:string;
content:string;

}

export interface OGrade{
    assignmentId:string,
    studentEmail:string,
    grade:string
}