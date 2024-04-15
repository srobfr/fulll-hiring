import { Command } from "commander";
import { string } from 'yup';
import VehicleCommands from "../../../App/Commands/VehicleCommands";
import ShellCommand from "./ShellCommand";

export default class RegisterVehicleCommand implements ShellCommand {

    constructor(private readonly vehicleCommands: VehicleCommands, private readonly defaultVehiclePlateNumber: string) { }

    register(program: Command) {
        program
            .command("localize-vehicle")
            .argument('<fleetId>', `The fleet id (in the UUID format)`)
            .argument('<vehiclePlateNumber>', `The vehicle plate number.`)
            .argument('lat', `Latitude`)
            .argument('lng', `Longitude`)
            .argument('[alt]', `Altitude`)
            .description(`Records the location of the given vehicle.
The vehicle with plate number ${this.defaultVehiclePlateNumber} already exists.`)
            .action(this.run.bind(this));
    }

    async run(fleetId: string, vehiclePlateNumber: string, lat: string, lng: string, alt: string) {
        if (!string().uuid().isValidSync(fleetId)) {
            throw new Error("Wrong format: fleetId should be an UUID");
        }

        if (!/^[A-Z]{2}-\d{3}-[A-Z]{2}$/.exec(vehiclePlateNumber)) {
            throw new Error("Wrong format: vehiclePlateNumber should match the AB-123-CD pattern");
        }

        if (isNaN(parseFloat(lat))) {
            throw new Error("Wrong format: lat should be a number");
        }

        if (isNaN(parseFloat(lng))) {
            throw new Error("Wrong format: lng should be a number");
        }

        if (alt && isNaN(parseFloat(alt))) {
            throw new Error("Wrong format: alt should be a number");
        }

        await this.vehicleCommands.parkVehicle(vehiclePlateNumber, {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            ...(alt ? {
                altitude: parseFloat(alt),
            } : {})
        });
    }
}
