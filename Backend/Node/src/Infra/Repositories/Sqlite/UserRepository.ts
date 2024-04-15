
import { randomUUID } from "crypto";
import User from "../../../Domain/User/User";
import UserRepositoryInterface from "../../../Domain/User/UserRepository";
import SqliteDb from "../../Database/SqliteDb";

export default class UserRepository implements UserRepositoryInterface {

    constructor(private readonly sqliteDb: SqliteDb) { }

    async create(id: User["id"] = randomUUID()): Promise<User> {
        const user = new User(id);
        this.sqliteDb.db
            .prepare(`INSERT INTO user (id) VALUES (@id)`)
            .run({ id: user.id });
        return user;
    }

    async findById(id: User["id"]): Promise<User | undefined> {
        const data = this.sqliteDb.db
            .prepare(`SELECT id FROM user WHERE id = @id LIMIT 1`)
            .pluck()
            .get({ id }) as User["id"] | undefined;

        if (!data) {
            return;
        }

        return new User(data);
    }
}
