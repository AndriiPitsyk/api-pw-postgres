import {test as base } from "@playwright/test";
import {Application} from "../api/conrtollers";
import {Database} from "../db";
import {authConfig} from "../db/config";
import {userData} from "../api/data/userDataGenerator";
import {LoginResponse, UserResponse} from "../api/conrtollers/types";

// Define the fixture type
type UserControllerFixtures = {
    api: Application,
    db: Database;
    userPayload: any;
    createdUser: UserResponse;
    loggedInAsNewUser: LoginResponse;
};

// Extend the test with custom fixtures
export const test = base.extend<UserControllerFixtures>({
    api: async({request}, use) =>{
        const app = new Application(request);
        await use(app);
    },
    db: async ({}, use) => {
        const db = new Database(authConfig);
        await use(db);
        await db.close();
    },
    userPayload: [userData.generate(), { option: true }],
    createdUser: async ({api, userPayload}, use) => {
        const response = await api.users.create(userPayload);
        await use(response);
        await api.users.delete(response.email);
    },
    loggedInAsNewUser: async({api, createdUser}, use)=> {
        const response = await api.auth.login({email:createdUser.email, password: createdUser.password});
        await use(response);
    }
});

export { expect } from '@playwright/test';
