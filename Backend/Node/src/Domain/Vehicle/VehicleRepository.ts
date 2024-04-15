import Vehicle, { Location } from "./Vehicle";

export default interface VehicleRepository {
    create(data: Omit<Vehicle, "id">): Promise<Vehicle>;

    findById(id: Vehicle["id"]): Promise<Vehicle | undefined>;

    findByPlateNumber(plateNumber: string): Promise<Vehicle | undefined>;

    updateLocation(vehiculeId: Vehicle["id"], location: Location): Promise<void>;
}
