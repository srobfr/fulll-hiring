
import { randomUUID } from "crypto";
import Fleet from "../../../Domain/Fleet/Fleet";
import FleetRepositoryInterface from "../../../Domain/Fleet/FleetRepository";
import User from "../../../Domain/User/User";
import Vehicle from "../../../Domain/Vehicle/Vehicle";
import SqliteDb from "../../Database/SqliteDb";

type FleetDataRow = (Omit<Fleet, "vehiclesIds"> & { vehiclesIds: string });

export default class FleetRepository implements FleetRepositoryInterface {

    constructor(private readonly sqliteDb: SqliteDb) { }

    async delete(id: Fleet["id"]): Promise<void> {
        this.sqliteDb.db
            .prepare(`DELETE FROM fleet WHERE id = @id`)
            .run({ id });
    }

    async create(ownerId: User["id"]): Promise<Fleet> {
        const fleet = new Fleet(randomUUID(), ownerId, new Set());
        this.sqliteDb.db
            .prepare(`INSERT INTO fleet (id, ownerId, vehiclesIds) VALUES (@id, @ownerId, '[]')`)
            .run({ id: fleet.id, ownerId });
        return fleet;
    }

    async findByOwnerId(ownerId: User["id"]): Promise<Fleet | undefined> {
        const data = this.sqliteDb.db
            .prepare(`SELECT * FROM fleet WHERE ownerId = @ownerId LIMIT 1`)
            .get({ ownerId }) as undefined | FleetDataRow;

        if (!data) {
            return undefined;
        }


        return new Fleet(
            data.id,
            data.ownerId,
            new Set(JSON.parse(data.vehiclesIds)),
        );
    }

    async findById(id: Fleet["id"]): Promise<Fleet | undefined> {
        const data = this.sqliteDb.db
            .prepare(`SELECT * FROM fleet WHERE id = @id LIMIT 1`)
            .get({ id }) as undefined | FleetDataRow;

        if (!data) {
            return undefined;
        }

        return new Fleet(
            data.id,
            data.ownerId,
            new Set(JSON.parse(data.vehiclesIds)),
        );
    }

    async addVehicleToFleet(fleetId: Fleet["id"], vehicleId: Vehicle["id"]): Promise<void> {
        const fleet = await this.findById(fleetId);
        if (!fleet) {
            throw new Error("Fleet not found");
        }

        fleet.vehiclesIds.add(vehicleId);
        this.sqliteDb.db
            .prepare(`UPDATE fleet SET vehiclesIds = @vehiclesIds WHERE id = @id LIMIT 1`)
            .run({
                id: fleet.id,
                vehiclesIds: JSON.stringify(Array.from(fleet.vehiclesIds)),
            });
    }
}
