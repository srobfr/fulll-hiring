import { UUID, randomUUID } from "crypto";
import User from "../../../src/Domain/User/User";
import { inMemoryDb } from "../../../src/Infra/ioc";

export const userAId = randomUUID();
export const userBId = randomUUID();

export async function getOrCreateUser(id: UUID): Promise<User> {
    let user = inMemoryDb.users.get(id);
    if (!user) {
        user = new User(id);
        inMemoryDb.users.set(id, user);
    }

    return user;
}

export async function getUserA() {
    return getOrCreateUser(userAId);
}

export async function getUserB() {
    return getOrCreateUser(userBId);
}
