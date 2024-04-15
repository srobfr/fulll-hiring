
import { randomUUID } from "crypto";
import Vehicle, { Location } from "../../../Domain/Vehicle/Vehicle";
import VehicleRepositoryInterface from "../../../Domain/Vehicle/VehicleRepository";
import InMemoryDb from "../../Database/InMemoryDb";

export default class VehicleRepository implements VehicleRepositoryInterface {

    constructor(private readonly inMemoryDb: InMemoryDb) { }

    async create(data: Omit<Vehicle, "id">): Promise<Vehicle> {
        const vehicle = new Vehicle(
            randomUUID(),
            data.plateNumber,
            data.latitude,
            data.longitude,
        );

        this.inMemoryDb.vehicles.set(vehicle.id, vehicle);
        return vehicle;
    }

    async findById(id: Vehicle["id"]): Promise<Vehicle | undefined> {
        return this.inMemoryDb.vehicles.get(id);
    }

    async findByPlateNumber(plateNumber: string): Promise<Vehicle | undefined> {
        return Array
            .from(this.inMemoryDb.vehicles.values())
            .find(vehicle => vehicle.plateNumber === plateNumber);
    }

    async updateLocation(vehiculeId: Vehicle["id"], location: Location): Promise<void> {
        const vehicle = await this.findById(vehiculeId);
        if (!vehicle) throw new Error("Vehicle not found");

        vehicle.latitude = location.latitude;
        vehicle.longitude = location.longitude;
        vehicle.altitude = location.altitude;
    }
}
