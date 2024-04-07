import { UUID } from "crypto";
import User from "./User";

export default interface UserRepository {
    create(): Promise<User>;
    findById(id: UUID): Promise<User | undefined>;
}
