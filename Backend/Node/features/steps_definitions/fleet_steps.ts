import { Given, IWorld, Then, When } from "@cucumber/cucumber";
import assert from "assert";
import { randomUUID } from "crypto";
import { getOrCreateFleet } from "./helpers/FleetHelper";
import { getUserA, getUserB } from "./helpers/UserHelper";

/**
 * Cucumber steps definitions for the Fleet domain
 */

Given('my fleet', async function () {
    const user = await getUserA(this.ioc.userRepository, this.ioc.configuration.defaultUserId);
    const fleet = await getOrCreateFleet(this.ioc.fleetRepository, this.userId ?? user.id);
    this.myFleetId = fleet.id;
});

Given('the fleet of another user', async function () {
    const user = await getUserB(this.ioc.userRepository);
    const fleet = await getOrCreateFleet(this.ioc.fleetRepository, user.id);
    this.userBFleetId = fleet.id;
});

async function registerVehicleIntoFleet(this: IWorld<any>) {
    const vehicle = await this.ioc.vehicleRepository.findById(this.aVehicleId);
    await this.ioc.fleetCommands.registerVehicle(this.myFleetId, vehicle.plateNumber);
}

Given('I have registered this vehicle into my fleet', registerVehicleIntoFleet);
When('I register this vehicle into my fleet', registerVehicleIntoFleet);

When('I try to register this vehicle into my fleet', async function () {
    try {
        await registerVehicleIntoFleet.apply(this);
        delete this.lastRegisterError;
    } catch (error) {
        this.lastRegisterError = error;
    }
});

Given("this vehicle has been registered into the other user's fleet", async function () {
    const vehicle = await this.ioc.vehicleRepository.findById(this.aVehicleId);
    await this.ioc.fleetCommands.registerVehicle(this.userBFleetId, vehicle.plateNumber);
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
    assert.strictEqual((this.lastRegisterError as Error | undefined)?.message, "The fleet already contains this vehicle");
});

Then('this vehicle should be part of my vehicle fleet', async function () {
    const fleet = await this.ioc.fleetRepository.findById(this.myFleetId);
    assert(fleet?.vehiclesIds.has(this.aVehicleId), "The vehicle is not part of my fleet");
});

When('I try to create my fleet', async function () {
    const user = await getUserA(this.ioc.userRepository, this.ioc.configuration.defaultUserId);
    try {
        await this.ioc.fleetCommands.createFleet(this.userId ?? user.id);
        delete this.lastCreateFleetError;
    } catch (error) {
        this.lastCreateFleetError = error;
    }
});

Then('I should be informed that my fleet already exists', function () {
    assert.strictEqual((this.lastCreateFleetError as Error | undefined)?.message, "A fleet already exists for this user");
});

Then('I should be informed that this user does not exists', function () {
    assert.strictEqual((this.lastCreateFleetError as Error | undefined)?.message, "User not found");
});

Given("I don't have a fleet", async function () {
    const user = await getUserA(this.ioc.userRepository, this.ioc.configuration.defaultUserId);
    const fleet = await this.ioc.fleetRepository.findByOwnerId(this.userId ?? user.id);
    if (fleet) {
        await this.ioc.fleetRepository.delete(fleet.id);
    }
});

When('I create my fleet', async function () {
    const user = await getUserA(this.ioc.userRepository, this.ioc.configuration.defaultUserId);
    await this.ioc.fleetCommands.createFleet(user.id);
});

Then('I should have a fleet', async function () {
    const user = await getUserA(this.ioc.userRepository, this.ioc.configuration.defaultUserId);
    const fleet = await this.ioc.fleetRepository.findByOwnerId(this.userId ?? user.id);
    assert(fleet, "The user should have a fleet");
});

Given('a non-existant user id', function () {
    this.userId = randomUUID();
});
