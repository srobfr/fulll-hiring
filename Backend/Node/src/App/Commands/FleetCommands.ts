import Fleet from "../../Domain/Fleet/Fleet";
import FleetRepository from "../../Domain/Fleet/FleetRepository";
import User from "../../Domain/User/User";
import UserRepository from "../../Domain/User/UserRepository";
import Vehicle from "../../Domain/Vehicle/Vehicle";
import VehicleRepository from "../../Domain/Vehicle/VehicleRepository";

export default class FleetCommands {
    constructor(
        private readonly fleetRepository: FleetRepository,
        private readonly userRepository: UserRepository,
        private readonly vehicleRepository: VehicleRepository) { }

    /**
     * Creates a fleet for the given user
     */
    async createFleet(ownerId: User["id"]): Promise<Fleet> {
        const owner = await this.userRepository.findById(ownerId);
        if (!owner) {
            throw new Error(`User not found`);
        }

        const userFleet = await this.fleetRepository.findByOwnerId(ownerId);
        if (userFleet) {
            throw new Error(`A fleet already exists for this user`);
        }

        return await this.fleetRepository.create(ownerId);
    }

    /**
     * Registers an existing vehicle in an existing fleet
     */
    async registerVehicle(fleetId: Fleet["id"], plateNumber: Vehicle["plateNumber"]): Promise<void> {
        const fleet = await this.fleetRepository.findById(fleetId);
        if (!fleet) {
            throw new Error(`The fleet ${fleetId} does not exist`);
        }

        const vehicle = await this.vehicleRepository.findByPlateNumber(plateNumber)
        if (!vehicle) {
            throw new Error(`This vehicle does not exist`);
        }

        if (fleet.vehiclesIds.has(vehicle.id)) {
            throw new Error(`The fleet already contains this vehicle`);
        }

        await this.fleetRepository.addVehicleToFleet(fleetId, vehicle.id);
    }
}
