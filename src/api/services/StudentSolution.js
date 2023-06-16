import { Api } from "..";

export default class StudentSolutionsService {
    static getMyStudentSolutions(assignmentId) {
        if (!assignmentId) return;

        return Api.get({ url: `/api/studentSolutions/my/${assignmentId}` })
    }

    static getStudentSolutionsByAssignment(assignmentId) {
        if (!assignmentId) return;

        return Api.get({ url: `/api/studentSolutions?assignmentId=${assignmentId}` })
    }

    static getStudentSolution(studentSolutionId) {
        if (!studentSolutionId) return;

        return Api.get({ url: `/api/studentSolutions/${studentSolutionId}` })
    }

    static createStudentSolution(studentSolutionDto) {
        return Api.post({
            url: '/api/studentSolutions',
            data: studentSolutionDto,
        });
    }

    static updateStudentSolutionResult(resultDto) {
        return Api.put({
            url: '/api/studentSolutions/result',
            data: resultDto,
        });
    }
}