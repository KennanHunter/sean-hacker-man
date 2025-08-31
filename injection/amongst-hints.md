# General

Any browser should work, but the game seems to be most stable in Chrome.

When launching a game, you need at least 3 players to start.  All of the "Shipmate" tasks are embedded inside the in-game tasks of the same name.

Controls are arrow keys or WASD to move and space to interact with objects.  If you're a hoaxer, you can press K to kill a nearby shipmate.

If you want to spin up this challenge locally, look into Docker and Docker Compose; if you have them installed, you can run `docker compose up` and it will build and launch the game locally for you, and you can connect to it at `http://localhost:8080`.

You can ignore the "Incite Conspiracy", "Contact Satellite", and "Explore Environment" flags; those are (very difficult!) bonus problems.



# Upload Data (misc)

## Challenge info

After completing the download portion of the in-game task, open your browser's developer tools and run the following in the console:

```js
const data = FileTransferController.downloadMap.get([...FileTransferController.downloadMap.keys()][0]);
const dl = document.createElement("a");
dl.href = "data:binary/octet-stream;base64," + btoa(data);
dl.setAttribute("download", "sus");
dl.click();
```

This will download a file called `sus` with the appropriate content.

## Tools to look into

- The `file` command
- Python



# Process Sample (crypto)

## Challenge info

This task involves two players, one who gets the "sample ID" and one who gets the "result code".  See `ProcessSampleSystem.ts` for the source of this challenge.

## Tools to look into

- Python
- numpy, sympy



# Provide Credentials (web)

## Challenge info

See `ProvideCredentialsSystem.ts` for the source of this challenge; your input is provided to `tick`.

## Tools to look into

You don't need any tools other than your browser to solve the challenge, but you'll probably want to look up SQL if you're not familiar with it.



# Recalibrate Engine (rev)

## Challenge info

See `engine` for the binary, and `engine.c` for the source.  A Dockerfile that will launch the service on port 25581 is also provided for convenience.

## Tools to look into

- Docker, if you're not running Linux and want to run the binary (or you can `scp` it to a unix server and run it there)
- Ghidra



# Purchase Snack (pwn)

## Challenge info

See `vending` for the binary.  A Dockerfile that will launch the service on port 35360 is also provided for convenience.

While the task is open, you can run the following in your browser's developer tools to send arbitrary content to the vending machine as input:

```js
setVendingMachineInput("whatever input you want");
```

## Tools to look into

- Docker, if you're not running Linux and want to run the binary (or you can `scp` it to a unix server and run it there)
	- I strongly recommend using an actual Linux environment for this task, as gdb sometimes doesn't play nice with Docker
- gdb