import {IUser} from "../models/response/IUser.ts";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService.ts";


export default class store {
    user = {} as IUser;
    isAuth = false;

    constructor() {
        makeAutoObservable(this)
    }
    setAuth(bool:boolean) {
        this.isAuth = bool
    }
    setUser(user:IUser) {
        this.user = user
    }
    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.error(e.response?.data?.message)
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.error(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            console.log(response)
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (e) {
            console.error(e.response.data?.message)
        }
    }
}