import FleetCommands from "../../App/Commands/FleetCommands";
import VehicleCommands from "../../App/Commands/VehicleCommands";
import InMemoryDb from "../Database/InMemoryDb";
import FleetRepository from "../Repositories/InMemory/FleetRepository";
import UserRepository from "../Repositories/InMemory/UserRepository";
import VehicleRepository from "../Repositories/InMemory/VehicleRepository";
import * as config from "../../configuration";

/**
 * "Dummy" IOC configuration for the vehicles fleet management app: 
 * nothing will be saved on-disk, only in memory.
 */

export const configuration = config;
export const inMemoryDb = new InMemoryDb();
export const userRepository = new UserRepository(inMemoryDb);
export const fleetRepository = new FleetRepository(inMemoryDb);
export const vehicleRepository = new VehicleRepository(inMemoryDb);
export const fleetCommands = new FleetCommands(fleetRepository, userRepository, vehicleRepository);
export const vehicleCommands = new VehicleCommands(vehicleRepository);
