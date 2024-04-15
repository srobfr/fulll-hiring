/**
 * fleet cli bootstrap
 * This is intended to be ran using the "fleet" shell script at the project root.
 */

import { shellCommands, program } from "../Ioc/sqlite_persisted_ioc";

for (const shellCommand of shellCommands) {
    shellCommand.register(program);
}

// Parses the given arguments and runs the corresponding action
program.parse();
