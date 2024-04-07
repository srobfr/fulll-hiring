import Fleet from "../../../src/Domain/Fleet/Fleet";
import User from "../../../src/Domain/User/User";
import { fleetRepository } from "../../../src/Infra/ioc";

export async function getOrCreateFleet(ownerId: User["id"]): Promise<Fleet> {
    let fleet = await fleetRepository.findByOwnerId(ownerId);
    if(!fleet) {
        fleet = await fleetRepository.create(ownerId);
    }
    return fleet;
}
