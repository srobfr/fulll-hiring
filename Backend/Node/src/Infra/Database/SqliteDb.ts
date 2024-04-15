import Database from "better-sqlite3";
import { randomUUID } from "crypto";
import User from "../../Domain/User/User";

/**
 * Sqlite database
 */
export default class SqliteDb {
    public db;

    constructor(
        dbFilePath: string,
        private readonly defaultUserId: User["id"],
        private readonly defaultVehiclePlateNumber: string
    ) {
        this.db = new Database(dbFilePath);

        this.handleSchemaCreation();
    }

    /**
     * Creates the schema if needed.
     * Note that this should be replaced by a full-fledged migrations system in a real application.
     */
    private handleSchemaCreation() {
        const result = this.db
            .prepare(`SELECT name FROM sqlite_master WHERE type = 'table' AND name = @name`)
            .pluck()
            .get({ name: "fleet" });

        if (result) {
            return;
        }

        this.db.prepare(`
            CREATE TABLE user (
                id TEXT PRIMARY KEY
            )
        `).run();

        this.db.prepare(`
            CREATE TABLE fleet (
                id TEXT PRIMARY KEY,
                ownerId TEXT REFERENCES user(id),
                vehiclesIds TEXT -- Actually a JSON-encoded array of UUIDs
            )
        `).run();

        this.db.prepare(`
            CREATE TABLE vehicle (
                id TEXT PRIMARY KEY,
                plateNumber TEXT,
                latitude NUMERIC,
                longitude NUMERIC,
                altitude NUMERIC
            )
        `).run();

        this.db.prepare(`
            INSERT INTO user (id) VALUES (@id);
        `).run({ id: this.defaultUserId });
        this.db.prepare(`
            INSERT INTO vehicle (id, plateNumber) VALUES (@id, @plateNumber);
        `).run({
            id: randomUUID(),
            plateNumber: this.defaultVehiclePlateNumber
        });
    }
}
