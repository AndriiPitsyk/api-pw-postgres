import {test, expect} from "../fixture";
import {userData} from "../data/UserGenerator";
let user;

test('Should successfully create a new user', async ({app}) => {
    const testUser = userData.generate();
    user = await app.user.create(testUser);
    expect(user, 'User data is invalid').toMatchObject({
        ...testUser,
        id: expect.any(Number),
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
    });
})

test('Should successfully update user', async ({app}) => {
    const [userOne, userTwo] = [userData.generate(), userData.generate()];
    const response = await app.user.create(userOne);
    user = await app.user.update(response.email, userTwo);
    expect(user, 'User data is invalid').toMatchObject({userName: userTwo.userName, email: userTwo.email});
})

test.afterEach(async ({app}) => {
   await app.user.delete(user.email);
})
