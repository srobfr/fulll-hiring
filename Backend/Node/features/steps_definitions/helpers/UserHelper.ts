import { UUID, randomUUID } from "crypto";
import User from "../../../src/Domain/User/User";
import UserRepository from "../../../src/Domain/User/UserRepository";

export const userBId = randomUUID();

export async function getOrCreateUser(userRepository: UserRepository, id: UUID): Promise<User> {
    let user = await userRepository.findById(id);
    if (!user) {
        user = await userRepository.create(id);
    }

    return user;
}

export async function getUserA(userRepository: UserRepository, userId: User["id"]) {
    return getOrCreateUser(userRepository, userId);
}

export async function getUserB(userRepository: UserRepository) {
    return getOrCreateUser(userRepository, userBId);
}
