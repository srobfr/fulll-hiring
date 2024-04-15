import { Given, IWorld, Then, When } from "@cucumber/cucumber";
import assert from "assert";
import { createVehicle } from "./helpers/VehicleHelper";

/**
 * Cucumber steps definitions for the Vehicle domain
 */

Given('a vehicle', async function () {
    const vehicle = await createVehicle(this.ioc.vehicleRepository);
    this.aVehicleId = vehicle.id;
});

Given('a location', function () {
    this.location = {
        latitude: Math.random() * 180 - 90,
        longitude: Math.random() * 360 - 180,
    }
});

async function parkVehicle(this: IWorld) {
    const vehicle = await this.ioc.vehicleRepository.findById(this.aVehicleId);
    await this.ioc.vehicleCommands.parkVehicle(vehicle.plateNumber, this.location);
}

Given('my vehicle has been parked into this location', parkVehicle);
When('I park my vehicle at this location', parkVehicle);

When('I try to park my vehicle at this location', async function () {
    try {
        await parkVehicle.apply(this);
        delete this.lastParkingAttemptError;
    } catch (error) {
        this.lastParkingAttemptError = error;
    }
});

Then('the known location of my vehicle should verify this location', async function () {
    const vehicle = await this.ioc.vehicleRepository.findById(this.aVehicleId);
    assert(vehicle, "Vehicle not found");
    assert.deepStrictEqual({
        latitude: vehicle.latitude,
        longitude: vehicle.longitude,
    }, this.location);
});

Then('I should be informed that my vehicle is already parked at this location', function () {
    assert.strictEqual((this.lastParkingAttemptError as Error | undefined)?.message, "This vehicle is already parked at this location");
});
