import { Given, Then, When } from "@cucumber/cucumber";
import assert from "assert";
import { vehicleCommands, vehicleRepository } from "../../src/Infra/ioc";
import { createVehicle } from "./helpers/VehicleHelper";
import { context } from "./helpers/common";

/**
 * Cucumber steps definitions for the Vehicle domain
 */

Given('a vehicle', async function () {
    const vehicle = await createVehicle();
    context.aVehicleId = vehicle.id;
});

Given('a location', function () {
    context.location = {
        latitude: Math.random() * 180 - 90,
        longitude: Math.random() * 360 - 180,
    }
});

async function parkVehicle() {
    await vehicleCommands.parkVehicle(context.aVehicleId, context.location);
}

Given('my vehicle has been parked into this location', parkVehicle);
When('I park my vehicle at this location', parkVehicle);

When('I try to park my vehicle at this location', async function () {
    try {
        await parkVehicle();
        delete context.lastParkingAttemptError;
    } catch (error) {
        context.lastParkingAttemptError = error;
    }
});

Then('the known location of my vehicle should verify this location', async function () {
    const vehicle = await vehicleRepository.findById(context.aVehicleId);
    assert(vehicle, "Vehicle not found");
    assert.deepStrictEqual({
        latitude: vehicle.latitude,
        longitude: vehicle.longitude,
    }, context.location);
});

Then('I should be informed that my vehicle is already parked at this location', function () {
    assert.strictEqual((context.lastParkingAttemptError as Error | undefined)?.message, "This vehicle is already parked at this location");
});
