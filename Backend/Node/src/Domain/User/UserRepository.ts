import User from "./User";

export default interface UserRepository {
    create(id?: User["id"]): Promise<User>;
    findById(id: User["id"]): Promise<User | undefined>;
}
