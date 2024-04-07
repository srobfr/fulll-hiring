
import Vehicle, { Location } from "../../../Domain/Vehicle/Vehicle";
import VehicleRepositoryInterface from "../../../Domain/Vehicle/VehicleRepository";
import InMemoryDb from "../../Database/InMemoryDb";

export default class VehicleRepository implements VehicleRepositoryInterface {

    constructor(private readonly inMemoryDb: InMemoryDb) { }

    async findById(id: Vehicle["id"]): Promise<Vehicle | undefined> {
        return this.inMemoryDb.vehicles.get(id);
    }

    async updateLocation(vehiculeId: Vehicle["id"], location: Location): Promise<void> {
        const vehicle = await this.findById(vehiculeId);
        if (!vehicle) throw new Error("Vehicle not found");

        vehicle.latitude = location.latitude;
        vehicle.longitude = location.longitude;
    }
}
