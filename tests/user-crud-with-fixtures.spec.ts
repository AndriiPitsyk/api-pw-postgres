import {test, expect} from "../fixture";
import {userData} from "../api/data/userDataGenerator";

let user;

test.describe('User creation with different roles', () => {
    const roles = ['user', 'admin', 'viewer'];

    for (const role of roles) {
        test.describe(`Role: ${role}`, () => {
            test.use({userPayload: userData.setUserData({role}).generate()});

            test(`Should create user with role "${role}"`, async ({api, userPayload}) => {
                user = await api.users.create(userPayload);
                expect(user).toMatchObject({
                    ...userPayload,
                    id: expect.any(Number),
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                });
            });
        });
    }

    test('Should successfully create a user with default request body', async ({api, userPayload}) => {
        user = await api.users.create(userPayload);
        expect(user, 'User data is invalid').toMatchObject({
            ...userPayload,
            id: expect.any(Number),
            updatedAt: expect.any(String),
            createdAt: expect.any(String)
        });
    })

    test.afterEach(async ({api}) => {
        await api.users.delete(user.email);
    })
});

test('Should successfully update user', async ({api, createdUser}) => {
    const testUserData = userData.generate();
    user = await api.users.update(createdUser.email, testUserData);
    expect(user, 'User data is invalid').toMatchObject({userName: testUserData.userName, email: testUserData.email});
})
