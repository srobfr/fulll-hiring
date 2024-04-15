import { Command } from "commander";
import { UUID } from "crypto";
import { string } from 'yup';
import FleetCommands from "../../../App/Commands/FleetCommands";
import ShellCommand from "./ShellCommand";

export default class CreateShellCommand implements ShellCommand {

    constructor(private readonly fleetCommands: FleetCommands, private readonly defaultUserId: string) { }

    register(program: Command) {
        program
            .command("create")
            .argument('<userId>', `The user id (in the UUID format). The default user id is: ${this.defaultUserId}`)
            .description(`Creates a fleet for the given user, and outputs the new fleet id.\nThe default user id is: ${this.defaultUserId}`)
            .action(this.run.bind(this));
    }

    async run(userId: string) {
        if (!string().uuid().isValidSync(userId)) {
            throw new Error("Wrong format: userId should be an UUID");
        }

        const fleet = await this.fleetCommands.createFleet(userId as UUID);
        console.log(`Created fleet ${fleet.id}`);
    }
}
