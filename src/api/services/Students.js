import { Api } from "..";

export default class StudentsService {
    static getStudents() {
        return Api.get({ url: '/api/students' })
    }

    static getStudent(studentId) {
        if (!studentId) return;

        return Api.get({ url: `/api/students/${studentId}` })
    }

    static createStudent(studentDto) {
        return Api.post({
            url: '/api/students',
            data: studentDto,
        });
    }

    static updateStudent(studentDto) {
        return Api.put({
            url: `/api/students`,
            data: studentDto
        })
    }

    static deleteStudent(studentId) {
        return Api.delete({
            url: `/api/students/${studentId}`
        })
    }
}