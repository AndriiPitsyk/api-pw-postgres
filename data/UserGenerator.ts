import {faker} from "@faker-js/faker";

interface UserRequestBody {
    userName: string;
    email: string;
    password: string;
    role: string;
}

class UserDataGenerator {

    generate(userData?: Partial<UserRequestBody>): UserRequestBody {
        return {
            userName: userData?.userName ?? faker.internet.userName(),
            email: userData?.email ?? faker.internet.email(),
            password: userData?.password ?? faker.internet.password(),
            role: userData?.role ?? "user"
        };
    }
}

export const userData = new UserDataGenerator();
