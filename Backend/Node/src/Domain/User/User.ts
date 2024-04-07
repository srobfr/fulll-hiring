import { UUID } from "crypto";

export default class User {
    constructor(
        public readonly id: UUID,
    ) { }
}
