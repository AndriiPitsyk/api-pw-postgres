import {test, expect} from "../fixture";
import {userData} from "../api/data/userDataGenerator";
let user;

test('Should successfully create a new user', async ({api}) => {
    const testUser = userData.generate();
    user = await api.users.create(testUser);
    expect(user, 'User data is invalid').toMatchObject({
        ...testUser,
        id: expect.any(Number),
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
    });
})

test('Should successfully get a new user data', async ({api}) => {
    const testUser = userData.generate();
    user = await api.users.create(testUser);
    const getUserData = await api.users.getUserByEmail(user.email);
    expect(getUserData, 'User data is invalid').toMatchObject({
        email: testUser.email,
        userName: testUser.userName,
        id: expect.any(Number),
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
    });
})

test('Should successfully update user', async ({api}) => {
    const [userOne, userTwo] = [userData.generate(), userData.generate()];
    const response = await api.users.create(userOne);
    user = await api.users.update(response.email, userTwo);
    expect(user, 'User data is invalid').toMatchObject({userName: userTwo.userName, email: userTwo.email});
})

test.afterEach(async ({api}) => {
   await api.users.delete(user.email);
})
