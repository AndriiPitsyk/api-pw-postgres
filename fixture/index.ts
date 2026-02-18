import {test as base } from "@playwright/test";
import {Application} from "../api/conrtollers";
import {Database} from "../db";
import {authConfig} from "../db/config";
import {userData} from "../api/data/userDataGenerator";

// Define the fixture type
type UserControllerFixtures = {
    api: Application,
    db: Database;
    createdUser: any;
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
        await db.close();
    },
    createdUser: async ({api}: UserControllerFixtures, use) => {
        const requestBody = userData.generate();
        const response = await api.users.create(requestBody);
        await use(response);
        await api.users.delete(response.email);
    },
});

export { expect } from '@playwright/test';
