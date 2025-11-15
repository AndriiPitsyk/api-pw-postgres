import {UserController} from "./userController";
import {APIRequestContext} from "@playwright/test";

export class Application {
    user: UserController;

    constructor(private request: APIRequestContext) {
        this.user = new UserController(this.request);
    }
}
