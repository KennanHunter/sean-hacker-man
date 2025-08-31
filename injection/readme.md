# Setting up

[Install pnpm](https://pnpm.io/installation)
[Install docker/docker compose](https://docs.docker.com/desktop/setup/install/windows-install/)

> link is for windows, if you're on linux just use your package manager

```
cd injection

# installs all the dependencies to connect to postgres
pnpm install

docker compose up -d

pnpm inject
```
