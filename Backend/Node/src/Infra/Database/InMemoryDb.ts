import Fleet from "../../Domain/Fleet/Fleet";
import User from "../../Domain/User/User";
import Vehicle from "../../Domain/Vehicle/Vehicle";

/**
 * Simple in-memory storage, basically a collection of entities indexed by their id using Maps objects
 */
export default class InMemoryDb {
    public users: Map<User["id"], User> = new Map();
    public fleets: Map<Fleet["id"], Fleet> = new Map();
    public vehicles: Map<Vehicle["id"], Vehicle> = new Map();
}
