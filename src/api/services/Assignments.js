import { Api } from "..";

export default class AssignmentsService {
    static getAssignments() {
        return Api.get({ url: '/api/assignments' })
    }

    static getAssignment(assignmentId) {
        if (!assignmentId) return;

        return Api.get({ url: `/api/assignments/${assignmentId}` })
    }

    static createAssignment(assignmentDto) {
        return Api.post({
            url: '/api/assignments',
            data: assignmentDto,
        });
    }

    static updateAssignment(assignmentDto) {
        return Api.put({
            url: `/api/assignments`,
            data: assignmentDto
        })
    }

    static deleteAssignment(assignmentId) {
        return Api.delete({
            url: `/api/assignments/${assignmentId}`
        })
    }
}