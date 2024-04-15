# Requirements
To run this project you will need a computer with Node and Yarn installed.

# Install
To install the project, you just have to run `yarn install` to get all the dependencies

# Running the tests
After installing the dependencies you can run the tests with this command `yarn test`.

# Using the app
A bootstrap shell script named "fleet" is provided at the project root.
It is an executable script, so you can run it using the `./fleet` shell command.

The database bootstrap already contains a user and a vehicle in order to facilitate the manual testing.
As configured in the src/configuration.ts file:

- The user id is `f832d504-5194-4500-acb5-aab6330b8969`
- the vehicle plate number is `AB-123-CD`

When using a command line argument starting with a hyphen, like for example a negative gps coordinate, you
should use the `--` symbol before it to prevent the CLI options parsing engine trying to parse it as an unknown option, like this :

```sh
./fleet localize-vehicle 00648997-778e-4f47-9e8f-8926486351ee AB-123-CD -- -1 -2 -3
```

The users & vehicles creation features are not implemented.
The database is a simple Sqlite3 db file, automatically created at the `var/data.db` path.
This file can be easily played with, using the standard `sqlite3` CLI client.

For example, to insert a new user in the database :

```sh
sqlite3 -header var/data.db "INSERT INTO user (id) VALUES ('7f918ece-557a-41a1-bd42-b353718106d9')"
```

To insert a new vehicle :
```sh
sqlite3 -header var/data.db "INSERT INTO vehicle (id, plateNumber) VALUES ('7f918ece-557a-41a1-bd42-b353718106d9', 'XX-543-XX')"
```

# Step.3 answers

For code quality, we can typically use linters to enforce an homogenous coding style through the project.
For Typescript & javascript, ESLint and Prettier are good examples.

A good practice is to trigger the linter using a git hook, like pre-push, which will catch code style errors before they can be pushed to the CI/CD 
system and/or pollute colleagues developpment branches.

Some code smells cannot be catched by automated tools. These are typically dealt with using manual cross code reviews between colleagues, using tools like 
Github PRs or Gitlab Merge Request for example.

A CI/CD can be of great help to ensure the automated tools (lint, tests, builds...) are ran properly on every git pushes.

To setup a CI/CD environment, I would typically deploy a dedicated tool like Jenkins or use Gitlab CI/CD feature.
Some PAAS tools exist too like Github Actions or Travis CI, for example.

The second step would be to configure the various build steps depending on the project.
Typically we would have these kind of steps, triggered by event like a push on the project git repository :

- lint
- build (ts -> js transpilation, docker images build...)
- automated tests execution on an isolated environment
- bumping a new version based on semver rules and the commits messages content (See for example https://www.conventionalcommits.org/en/v1.0.0/)
- push the new version a git tag
- pushing the built artifacts on a registry with the bumped version
- deploy the new version on production servers

Obviously this configuration will depend on the project, the possibility to rollback changes on production environment, the 
reliability of the automated tests scenarios, the availability of a QA team, etc.
