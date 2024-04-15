import { Command } from "commander";

/**
 * Describes a shell command interface for the "fleet" utility.
 */
export default interface ShellCommand {
    register: (program: Command) => void
}
