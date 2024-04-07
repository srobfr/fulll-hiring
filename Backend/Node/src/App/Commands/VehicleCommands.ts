import Vehicle, { Location } from "../../Domain/Vehicle/Vehicle";
import VehicleRepository from "../../Domain/Vehicle/VehicleRepository";

export default class VehicleCommands {
    constructor(private readonly vehicleRepository: VehicleRepository) { }

    async parkVehicle(vehicleId: Vehicle["id"], location: Location) {
        await this.vehicleRepository.updateLocation(vehicleId, location);
    }
}
