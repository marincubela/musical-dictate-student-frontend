/*import { Api } from 'api/index';*/
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { Api } from "../index"

export default class AuthService {
    static getAccessToken() {
        try {
            return window?.localStorage?.getItem(ACCESS_TOKEN);
        } catch (error) {
            // TODO What if user has disabled local storage?
            return null;
        }
    }

    static getRefreshToken() {
        try {
            return window?.localStorage?.getItem(REFRESH_TOKEN);
        } catch (error) {
            // TODO What if user has disabled local storage?
            return null;
        }
    }

    static async refreshTokens() {
        try {
            const accessToken = this.getAccessToken();
            const refreshToken = this.getRefreshToken();

            const newTokens = await Api.post({
                url: '/api/auth/refresh-token',
                data: { accessToken, refreshToken },
            });

            this.saveTokens(newTokens);
        } catch (error) {
            // TODO What if user has disabled local storage?
            return null;
        }
    }

    static saveTokens(tokens) {
        try {
            window?.localStorage?.setItem("access-token", tokens.accessToken);
            window?.localStorage?.setItem("refresh-token", tokens.refreshToken);
        } catch (error) {
            // TODO What if user has disabled local storage?
        }
    }

    static hasTokens() {
        return Boolean(this.getAccessToken() && this.getRefreshToken());
    }

    static removeTokens() {
        try {
            window?.localStorage?.removeItem(ACCESS_TOKEN);
            window?.localStorage?.removeItem(REFRESH_TOKEN);
        } catch (error) {
            // TODO What if user has disabled local storage?
        }
    }

    static async loginStudent(email, password) {
        const tokens = await Api.post({
            url: '/api/auth/login/student',
            data: { email, password },
        });
        return this.saveTokens(tokens);
    }

    static async loginTeacher(email, password) {
        const tokens = await Api.post({
            url: '/api/auth/login/teacher',
            data: { email, password },
        });
        return this.saveTokens(tokens);
    }

    static logoutUser(userName) {
        this.removeTokens();
        if (typeof window !== 'undefined') {
            // Force a hard reload
            window.location.href = '/login';
        }

        // TODO Do the token revoke via backend at later point
        // if (userName) {
        // return Api.post({
        //   url: '/api/Authorize/revoke/',
        //   data: { userName },
        // });
        // }
    }

    static async registerStudent(
        email,
        password,
        jmbag,
        firstName,
        lastName,
        nameClass,
    ) {
        const tokens = await Api.post({
            url: '/api/auth/register/student',
            data: { jmbag, firstName, lastName, nameClass, email, password },
        });
        return this.saveTokens(tokens);
    }

    static async registerTeacher(
        email,
        password,
        firstName,
        lastName,
    ) {
        const tokens = await Api.post({
            url: '/api/auth/register/teacher',
            data: { firstName, lastName, email, password },
        });
        return this.saveTokens(tokens);
    }
}
