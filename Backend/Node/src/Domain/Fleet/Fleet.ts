import { UUID } from "crypto";
import User from "../User/User";
import Vehicle from "../Vehicle/Vehicle";

export default class Fleet {
    constructor(
        public readonly id: UUID,
        public ownerId: User["id"],
        public vehiclesIds: Set<Vehicle["id"]>,
    ) { }
}
