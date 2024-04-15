
import { randomUUID } from "crypto";
import Fleet from "../../../Domain/Fleet/Fleet";
import FleetRepositoryInterface from "../../../Domain/Fleet/FleetRepository";
import InMemoryDb from "../../Database/InMemoryDb";
import User from "../../../Domain/User/User";
import Vehicle from "../../../Domain/Vehicle/Vehicle";

export default class FleetRepository implements FleetRepositoryInterface {

    constructor(private readonly inMemoryDb: InMemoryDb) { }

    async delete(id: Fleet["id"]): Promise<void> {
        this.inMemoryDb.fleets.delete(id);
    }

    async create(ownerId: User["id"]): Promise<Fleet> {
        const fleet = new Fleet(randomUUID(), ownerId, new Set());
        this.inMemoryDb.fleets.set(fleet.id, fleet);
        return fleet;
    }

    async findByOwnerId(ownerId: User["id"]): Promise<Fleet | undefined> {
        return Array
            .from(this.inMemoryDb.fleets.values())
            .find(fleet => fleet.ownerId === ownerId);
    }

    async findById(id: Fleet["id"]): Promise<Fleet | undefined> {
        return this.inMemoryDb.fleets.get(id);
    }

    async addVehicleToFleet(fleetId: Fleet["id"], vehicleId: Vehicle["id"]): Promise<void> {
        const fleet = await this.findById(fleetId);
        if (!fleet) throw new Error("Fleet not found");
        fleet.vehiclesIds.add(vehicleId);
    }
}
