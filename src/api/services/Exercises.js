import { Api } from "..";

export default class ExercisesService {
    static getExercises() {
        return Api.get({ url: '/api/exercises' })
    }

    static getExercise(exerciseId) {
        if (!exerciseId) return;

        return Api.get({ url: `/api/exercises/${exerciseId}` })
    }

    static createExercise(exerciseDto) {
        return Api.post({
            url: '/api/exercises',
            data: exerciseDto,
        });
    }

    static updateExercise(exerciseDto) {
        return Api.put({
            url: `/api/exercises`,
            data: exerciseDto
        })
    }

    static deleteExercise(exerciseId) {
        return Api.delete({
            url: `/api/exercises/${exerciseId}`
        })
    }
}