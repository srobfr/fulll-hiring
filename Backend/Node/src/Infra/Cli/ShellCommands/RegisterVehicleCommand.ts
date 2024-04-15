import { Command } from "commander";
import { string } from 'yup';
import FleetCommands from "../../../App/Commands/FleetCommands";
import ShellCommand from "./ShellCommand";
import { UUID } from "crypto";

export default class RegisterVehicleCommand implements ShellCommand {

    constructor(private readonly fleetCommands: FleetCommands, private readonly defaultVehiclePlateNumber: string) { }

    register(program: Command) {
        program
            .command("register-vehicle")
            .argument('<fleetId>', `The fleet id (in the UUID format)`)
            .argument('<vehiclePlateNumber>', `The vehicle plate number.`)
            .description(`Adds an existing vehicle to a fleet. Please note that both must already exist in the database.
The vehicle with plate number ${this.defaultVehiclePlateNumber} already exists.`)
            .action(this.run.bind(this));
    }

    async run(fleetId: string, vehiclePlateNumber: string) {
        if (!string().uuid().isValidSync(fleetId)) {
            throw new Error("Wrong format: fleetId should be an UUID");
        }

        await this.fleetCommands.registerVehicle(fleetId as UUID, vehiclePlateNumber);
    }
}
