import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, catchError, tap, throwError } from "rxjs";
import { C } from "../types/const";
import { EMPTY_TYPE, User } from "../types/types";
import { SnackService } from "./snack.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly user: BehaviorSubject<User>;

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
        private readonly snackService: SnackService
    ) {
        let user = sessionStorage.getItem("user");
        if (!user) {
            this.user = new BehaviorSubject<User>(EMPTY_TYPE.EMPTY_USER);
        } else {
            this.user = new BehaviorSubject<User>(JSON.parse(user))
        }
    }

    public async login(username: string, password: string): Promise<void> {
        const formData = new FormData()
        formData.set("username", username);
        formData.set("password", password);

        const headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded' });
        const body = `username=${username}&password=${password}`;

        this.http.post("http://localhost:3000/processLogin", body, { responseType: 'text', headers: headers, observe: "response", withCredentials: true }).subscribe(
            data => {
                if (!data) return;

                const token = btoa(username + ':' + password)
                sessionStorage.setItem('token', "Basic " + token);

                this.snackService.info(`You are logged in!`)
                this.router.navigate(['']);
                const url = C.API + "user/" + username;

                this.http.get<User>(url).pipe(
                    tap((myUser: User) => {
                        myUser.token = token;
                        console.log(myUser);
                        sessionStorage.setItem('user', JSON.stringify(myUser));
                        sessionStorage.setItem('id', '' + myUser.id);
                        this.user.next(myUser);
                    }),
                    catchError((err) => {
                        console.log('you?');
                        console.log(err);
                        return throwError(err);
                    })
                ).subscribe();
            },
            erorr => {
                console.log(erorr);
                this.snackService.error("An error has happend!");
            }
        )
    }

    public userObservable(): Observable<User> {
        return this.user.asObservable();
    }

    public async updateUser(user: User) {

    }

    public get asObservable(): Observable<User | undefined> {
        return this.user.asObservable();
    }

    public get dataObservable(): Observable<User> {
        return this.user.asObservable();
    }

    public async refresh(): Promise<void> {
        await this.updateUser(this.user.getValue());
    }
}