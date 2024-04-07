import { UUID } from "crypto";

export interface Location {
    latitude: number,
    longitude: number,
}

export default class Vehicle {
    constructor(
        public readonly id: UUID,
        public plateNumber: string,
        public latitude?: Location["latitude"],
        public longitude?: Location["longitude"],
    ) { }
}
