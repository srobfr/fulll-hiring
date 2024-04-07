import Fleet from "../../Domain/Fleet/Fleet";
import FleetRepository from "../../Domain/Fleet/FleetRepository";
import User from "../../Domain/User/User";
import Vehicle from "../../Domain/Vehicle/Vehicle";

export default class FleetCommands {
    constructor(private readonly fleetRepository: FleetRepository) { }

    /**
     * Creates a fleet for the given user
     */
    async createFleet(ownerId: User["id"]): Promise<Fleet> {
        const userFleet = await this.fleetRepository.findByOwnerId(ownerId);
        if (userFleet) {
            throw new Error(`The user ${ownerId} already has a fleet`);
        }

        return await this.fleetRepository.create(ownerId);
    }

    /**
     * Registers an existing vehicle in an existing fleet
     */
    async registerVehicle(fleetId: Fleet["id"], vehicleId: Vehicle["id"]): Promise<void> {
        const fleet = await this.fleetRepository.findById(fleetId);
        if (!fleet) {
            throw new Error(`The fleet ${fleetId} does not exist`);
        }

        if (fleet.vehiclesIds.has(vehicleId)) {
            throw new Error(`The fleet already contains the vehicle`);
        }

        await this.fleetRepository.addVehicleToFleet(fleetId, vehicleId);
    }
}
