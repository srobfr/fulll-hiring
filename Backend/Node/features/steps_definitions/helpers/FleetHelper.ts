import Fleet from "../../../src/Domain/Fleet/Fleet";
import User from "../../../src/Domain/User/User";
import FleetRepository from "../../../src/Domain/Fleet/FleetRepository";

export async function getOrCreateFleet(fleetRepository: FleetRepository, ownerId: User["id"]): Promise<Fleet> {
    let fleet = await fleetRepository.findByOwnerId(ownerId);
    if(!fleet) {
        fleet = await fleetRepository.create(ownerId);
    }
    return fleet;
}
