import { Given, Then, When } from "@cucumber/cucumber";
import { fleetRepository, vehicleCommands, vehicleRepository } from "../../src/Infra/ioc";
import { createVehicle } from "./helpers/VehicleHelper";
import { context } from "./helpers/common";
import assert from "assert";

/**
 * Cucumber steps definitions for the Vehicle domain
 */

Given('a vehicle', async function () {
    const vehicle = await createVehicle();
    context.aVehicleId = vehicle.id;
});

Given('I have registered this vehicle into my fleet', async function () {
    await fleetRepository.addVehicleToFleet(context.myFleetId, context.aVehicleId);
});

Given('a location', function () {
    context.location = {
        latitude: Math.random() * 180 - 90,
        longitude: Math.random() * 360 - 180,
    }
});

Given('my vehicle has been parked into this location', async function () {
    await vehicleCommands.parkVehicle(context.aVehicleId, context.location);
});

When('I park my vehicle at this location', async function () {
    await vehicleCommands.parkVehicle(context.aVehicleId, context.location);
});

Then('the known location of my vehicle should verify this location', async function () {
    // SROB
    const vehicle = await vehicleRepository.findById(context.aVehicleId);
    assert(vehicle, "Vehicle not found");
    assert.deepStrictEqual({
        latitude: vehicle.latitude,
        longitude: vehicle.longitude,
    }, context.location)
});
