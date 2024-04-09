import Vehicle, { Location } from "../../Domain/Vehicle/Vehicle";
import VehicleRepository from "../../Domain/Vehicle/VehicleRepository";

export default class VehicleCommands {
    constructor(private readonly vehicleRepository: VehicleRepository) { }

    /**
     * Records the parking location of the given vehicle
     */
    async parkVehicle(vehicleId: Vehicle["id"], location: Location) {
        const vehicle = await this.vehicleRepository.findById(vehicleId);

        if (!vehicle) {
            throw new Error("Vehicle not found");
        }

        if (vehicle.latitude === location.latitude && vehicle.longitude === location.longitude) {
            throw new Error("This vehicle is already parked at this location");
        }

        await this.vehicleRepository.updateLocation(vehicleId, location);
    }
}
