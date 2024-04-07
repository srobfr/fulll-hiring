import User from "../User/User";
import Vehicle from "../Vehicle/Vehicle";
import Fleet from "./Fleet";

export default interface FleetRepository {
    create(ownerId: User["id"]): Promise<Fleet>;

    findById(id: Fleet["id"]): Promise<Fleet | undefined>;

    findByOwnerId(ownerId: User["id"]): Promise<Fleet | undefined>;

    addVehicleToFleet(fleetId: Fleet["id"], vehicleId: Vehicle["id"]): Promise<void>;
}
