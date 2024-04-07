import { randomUUID } from "crypto";
import Vehicle from "../../../src/Domain/Vehicle/Vehicle";
import { inMemoryDb } from "../../../src/Infra/ioc";
import { randomDigits, randomUppercaseLetters } from "./common";

const randomPlateNumber = () => `${randomUppercaseLetters(2)}-${randomDigits(4)}-${randomUppercaseLetters(2)}`;

export async function createVehicle(): Promise<Vehicle> {
    const vehicle = new Vehicle(
        randomUUID(),
        randomPlateNumber(),
    );

    inMemoryDb.vehicles.set(vehicle.id, vehicle);

    return vehicle;
}
