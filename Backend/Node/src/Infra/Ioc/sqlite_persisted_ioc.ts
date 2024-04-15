import { Command } from "commander";
import FleetCommands from "../../App/Commands/FleetCommands";
import VehicleCommands from "../../App/Commands/VehicleCommands";
import CreateShellCommand from "../Cli/ShellCommands/CreateShellCommand";
import SqliteDb from "../Database/SqliteDb";
import FleetRepository from "../Repositories/Sqlite/FleetRepository";
import UserRepository from "../Repositories/Sqlite/UserRepository";
import VehicleRepository from "../Repositories/Sqlite/VehicleRepository";
import * as config from "../../configuration";
import RegisterVehicleCommand from "../Cli/ShellCommands/RegisterVehicleCommand";
import LocalizeVehicleCommand from "../Cli/ShellCommands/LocalizeVehicleCommand";

/**
 * "Real" IOC configuration for the vehicles fleet management app:
 * data are persisted in a Sqlite database.
 */

export const configuration = config;
export const sqliteDb = new SqliteDb("var/data.db", config.defaultUserId, config.defaultVehiclePlateNumber);
export const userRepository = new UserRepository(sqliteDb);
export const fleetRepository = new FleetRepository(sqliteDb);
export const vehicleRepository = new VehicleRepository(sqliteDb);

export const fleetCommands = new FleetCommands(fleetRepository, userRepository, vehicleRepository);
export const vehicleCommands = new VehicleCommands(vehicleRepository);

export const createShellCommand = new CreateShellCommand(fleetCommands, config.defaultUserId);
export const registerVehicleCommand = new RegisterVehicleCommand(fleetCommands, config.defaultVehiclePlateNumber);
export const localizeVehicleCommand = new LocalizeVehicleCommand(vehicleCommands, config.defaultVehiclePlateNumber);

export const shellCommands = [
    createShellCommand,
    registerVehicleCommand,
    localizeVehicleCommand,
];

export const program = new Command();

