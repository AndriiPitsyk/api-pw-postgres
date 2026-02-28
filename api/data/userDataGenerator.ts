import {faker} from "@faker-js/faker";

interface UserRequestBody {
    userName: string;
    email: string;
    password: string;
    role: string;
}

class UserDataGenerator {
    userData: UserRequestBody = {
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: "user"
    }

    setUserData(userData:{userName?: string, email?: string, password?: string, role?: string}): this {
        this.userData = {...this.userData, ...userData};
        return this;

    }

    generate(): UserRequestBody {
        return this.userData;
    }
}

export const userData = new UserDataGenerator();
