import Vehicle, { Location } from "./Vehicle";

export default interface VehicleRepository {
    findById(id: Vehicle["id"]): Promise<Vehicle | undefined>;

    updateLocation(vehiculeId: Vehicle["id"], location: Location): Promise<void>;
}
