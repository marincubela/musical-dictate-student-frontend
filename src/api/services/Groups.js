import { Api } from "..";

export default class GroupsService {
    static getGroups() {
        return Api.get({ url: '/api/studentgroups' })
    }

    static getMyGroups() {
        return Api.get({ url: '/api/studentgroups/my' })
    }

    static getGroup(groupId) {
        if (!groupId) return;

        return Api.get({ url: `/api/studentgroups/${groupId}` })
    }

    static getMyGroup(groupId) {
        if (!groupId) return;

        return Api.get({ url: `/api/studentgroups/my/${groupId}` })
    }

    static createGroup(groupDto) {
        if (!groupDto) return;

        return Api.post({
            url: `/api/studentgroups`, data: {
                ...groupDto
            }
        })
    }

    static updateGroup(groupDto) {
        return Api.put({
            url: `/api/studentgroups`,
            data: {
                ...groupDto
            }
        })
    }

    static deleteGroup(groupId) {
        return Api.delete({
            url: `/api/studentgroups/${groupId}`
        })
    }
}