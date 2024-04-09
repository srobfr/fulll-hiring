import User from "./User";

export default interface UserRepository {
    create(): Promise<User>;
    findById(id: User["id"]): Promise<User | undefined>;
}
