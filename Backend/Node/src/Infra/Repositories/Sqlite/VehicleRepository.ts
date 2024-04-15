
import { randomUUID } from "crypto";
import Vehicle, { Location } from "../../../Domain/Vehicle/Vehicle";
import VehicleRepositoryInterface from "../../../Domain/Vehicle/VehicleRepository";
import SqliteDb from "../../Database/SqliteDb";

export default class VehicleRepository implements VehicleRepositoryInterface {

    constructor(private readonly sqliteDb: SqliteDb) { }

    async create(data: Omit<Vehicle, "id">): Promise<Vehicle> {
        const vehicle = new Vehicle(randomUUID(), data.plateNumber, data.latitude, data.longitude);
        this.sqliteDb.db
            .prepare(`INSERT INTO vehicle (id, plateNumber, latitude, longitude, altitude) VALUES (@id, @plateNumber, @latitude, @longitude, @altitude)`)
            .run({
                id: vehicle.id,
                plateNumber: vehicle.plateNumber,
                latitude: vehicle.latitude,
                longitude: vehicle.longitude,
                altitude: vehicle.altitude,
            });
        return vehicle;
    }

    async findById(id: Vehicle["id"]): Promise<Vehicle | undefined> {
        const data = this.sqliteDb.db
            .prepare(`SELECT * FROM vehicle WHERE id = @id LIMIT 1`)
            .get({ id }) as Vehicle | undefined;

        if (!data) {
            return;
        }

        return new Vehicle(data.id, data.plateNumber, data.latitude, data.longitude);
    }

    async findByPlateNumber(plateNumber: string): Promise<Vehicle | undefined> {
        const data = this.sqliteDb.db
            .prepare(`SELECT * FROM vehicle WHERE plateNumber = @plateNumber LIMIT 1`)
            .get({ plateNumber }) as Vehicle | undefined;

        if (!data) {
            return;
        }

        return new Vehicle(data.id, data.plateNumber, data.latitude, data.longitude, data.altitude);
    }

    async updateLocation(vehiculeId: Vehicle["id"], location: Location): Promise<void> {
        const vehicle = await this.findById(vehiculeId);
        if (!vehicle) {
            throw new Error("Vehicle not found");
        }
        this.sqliteDb.db
            .prepare(`UPDATE vehicle SET latitude = @latitude, longitude = @longitude, altitude = @altitude WHERE id = @id LIMIT 1`)
            .run({
                id: vehicle.id,
                latitude: location.latitude,
                longitude: location.longitude,
                altitude: location.altitude ?? null,
            });
    }
}
