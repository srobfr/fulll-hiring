import { Given } from "@cucumber/cucumber";
import { getOrCreateFleet } from "./helpers/FleetHelper";
import { getUserA } from "./helpers/UserHelper";
import { context } from "./helpers/common";

/**
 * Cucumber steps definitions for the Fleet domain
 */

Given('my fleet', async function () {
    const user = await getUserA();
    const fleet = await getOrCreateFleet(user.id);
    context.myFleetId = fleet.id;
});
