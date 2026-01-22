import {test, expect} from "../fixture";
import {userData} from "../api/data/userDataGenerator";
import {db} from '../db';
let user;

test.beforeAll(async () => {
    await db.connect();
});

test('Should successfully create new user', async ({api}) => {
    const testUser = userData.generate();
    user = await api.users.create(testUser);
    expect(user).toMatchObject({
        ...testUser,
        id: expect.any(Number),
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
    });

    /** DB check **/
    const result = await db.users.getUserByEmail(user.email);
    expect(result).toMatchObject({...testUser, id: expect.any(Number)})
})

test('Should successfully create 2nd user', async ({api}) => {
    const testUser = userData.generate();
    user = await api.users.create(testUser);
    expect(user).toMatchObject({
        ...testUser,
        id: expect.any(Number),
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
    });

    /** DB check **/
    const result = await db.users.getUserById(user.id);
    expect(result).toMatchObject({...testUser, id: expect.any(Number)})
})


test.afterEach(async ({api}) => {
    const response = await api.users.delete(user.email);
    expect(response.status()).toBe(200);
})

test.afterAll(async () => {
    await db.close();
});
