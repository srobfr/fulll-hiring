
import { randomUUID } from "crypto";
import User from "../../../Domain/User/User";
import UserRepositoryInterface from "../../../Domain/User/UserRepository";
import InMemoryDb from "../../Database/InMemoryDb";

export default class UserRepository implements UserRepositoryInterface {

    constructor(private readonly inMemoryDb: InMemoryDb) { }

    async create(): Promise<User> {
        const user = new User(randomUUID());
        this.inMemoryDb.users.set(user.id, user);
        return user;
    }

    async findById(id: User["id"]): Promise<User | undefined> {
        return this.inMemoryDb.users.get(id);
    }
}
