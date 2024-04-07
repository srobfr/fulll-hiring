import { UUID } from "crypto";
import Vehicle, { Location } from "./Vehicle";

export default interface VehicleRepository {
    findById(id: UUID): Promise<Vehicle | undefined>;

    updateLocation(vehiculeId: Vehicle["id"], location: Location): Promise<void>;
}
