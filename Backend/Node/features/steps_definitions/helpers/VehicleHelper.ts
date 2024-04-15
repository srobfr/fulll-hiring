import Vehicle from "../../../src/Domain/Vehicle/Vehicle";
import VehicleRepository from "../../../src/Domain/Vehicle/VehicleRepository";
import { randomDigits, randomUppercaseLetters } from "./common";

const randomPlateNumber = () => `${randomUppercaseLetters(2)}-${randomDigits(4)}-${randomUppercaseLetters(2)}`;

export async function createVehicle(vehicleRepository: VehicleRepository): Promise<Vehicle> {
    return await vehicleRepository.create({
        plateNumber: randomPlateNumber(),
    });
}
