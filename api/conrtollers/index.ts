import {UserController} from "./userController";
import {APIRequestContext} from "@playwright/test";

export class Application {
    users: UserController;

    constructor(private request: APIRequestContext) {
        this.users = new UserController(this.request);
    }
}
