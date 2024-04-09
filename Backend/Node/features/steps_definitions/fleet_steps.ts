import { Given, Then, When } from "@cucumber/cucumber";
import { getOrCreateFleet } from "./helpers/FleetHelper";
import { getUserA, getUserB } from "./helpers/UserHelper";
import { context } from "./helpers/common";
import { fleetCommands, fleetRepository } from "../../src/Infra/ioc";
import assert from "assert";

/**
 * Cucumber steps definitions for the Fleet domain
 */

Given('my fleet', async function () {
    const user = await getUserA();
    const fleet = await getOrCreateFleet(user.id);
    context.myFleetId = fleet.id;
});

Given('the fleet of another user', async function () {
    const user = await getUserB();
    const fleet = await getOrCreateFleet(user.id);
    context.userBFleetId = fleet.id;
});

async function registerVehicleIntoFleet() {
    await fleetCommands.registerVehicle(context.myFleetId, context.aVehicleId);
}

Given('I have registered this vehicle into my fleet', registerVehicleIntoFleet);
When('I register this vehicle into my fleet', registerVehicleIntoFleet);

When('I try to register this vehicle into my fleet', async function () {
    try {
        await registerVehicleIntoFleet();
        delete context.lastRegisterError;
    } catch (error) {
        context.lastRegisterError = error;
    }
});

Given("this vehicle has been registered into the other user's fleet", async function () {
    await fleetCommands.registerVehicle(context.userBFleetId, context.aVehicleId);
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
    assert.strictEqual((context.lastRegisterError as Error | undefined)?.message, "The fleet already contains the vehicle");
});

Then('this vehicle should be part of my vehicle fleet', async function () {
    const fleet = await fleetRepository.findById(context.myFleetId);
    assert(fleet?.vehiclesIds.has(context.aVehicleId), "The vehicle is not part of my fleet");
});
