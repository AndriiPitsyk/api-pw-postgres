import {test, expect} from "../fixture";
import {faker} from "@faker-js/faker";

test('Should successfully update user', async ({api, db, createdUser}) => {
    const getUserData = await api.users.getUserByEmail(createdUser.email);
    const requestBody = structuredClone(getUserData);
    requestBody.userName = faker.internet.userName();
    await api.users.update(getUserData.email, requestBody);
    const response = await api.users.getUserByEmail(createdUser.email);
    const dbUserData = await db.users.getUserByEmail(createdUser.email);
    expect(response.userName).toBe(requestBody.userName);
    expect(dbUserData.userName).toBe(requestBody.userName);
})
