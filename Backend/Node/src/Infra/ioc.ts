import FleetCommands from "../App/Commands/FleetCommands";
import VehicleCommands from "../App/Commands/VehicleCommands";
import InMemoryDb from "./Database/InMemoryDb";
import FleetRepository from "./Repositories/InMemory/FleetRepository";
import UserRepository from "./Repositories/InMemory/UserRepository";
import VehicleRepository from "./Repositories/InMemory/VehicleRepository";

/**
 * A really simple form of IoC container
 */

export const inMemoryDb = new InMemoryDb();
export const userRepository = new UserRepository(inMemoryDb);
export const fleetRepository = new FleetRepository(inMemoryDb);
export const vehicleRepository = new VehicleRepository(inMemoryDb);

export const fleetCommands = new FleetCommands(fleetRepository);
export const vehicleCommands = new VehicleCommands(vehicleRepository);
