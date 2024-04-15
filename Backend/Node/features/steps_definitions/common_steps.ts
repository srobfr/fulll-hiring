import { Before } from "@cucumber/cucumber";
import * as dummyIoc from "../../src/Infra/Ioc/dummy_ioc";
import * as sqlitePersistedIoc from "../../src/Infra/Ioc/sqlite_persisted_ioc";

Before(function () {
    // Default IOC variant
    this.ioc = dummyIoc;
});

Before({tags: '@critical'}, function () {
    // For critical tests, we want to use a real db engine.
    this.ioc = sqlitePersistedIoc;
});
