# broadcast-app

## Start Coding
First install all dependencies:
```
npm install
```

For develoment use:
```
npm run dev
```

## Using in production
Install only production dependencies:
```
npm install --production
```

## Starting the streaming server
You need a streaming server for this application. For develoment you can use this docker command:
```
docker run --rm -p 1935:1935 -p 1985:1985 -p 8080:8080 \
    -v $PWD/srs.conf:/usr/local/srs/conf/srs.conf \
    ossrs/srs:3
```

## Docker
You can also use it for docker. Build the app:
```
docker build -t broadcast-app:latest app/
```

## Deployment

First you need `docker` and `docker-compose` installed:
```bash
curl -fsSL https://get.docker.com | bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

If you are in a network where the internal ip address are default to 172.x.x.x you will need to create a file called `/etc/docker/daemon.json`:
```bash
sudo nano /etc/docker/daemon.json
```

Then paste this in:

```json
{
  "default-address-pools":
  [
    {"base":"10.10.0.0/16","size":24}
  ]
}
```
Otherwise networking will stop to work properly.

After that clone this project. In the root do the following:
```
cp .env.example .env
```
Edit the file. The `HOST` is the domain name of the server. This is needed for automatically acquiring the https certificate. The `KEY` is the 'password' for the upload. Set it to something secure and long.

Now you can just start the `docker-compose.yml`:
```
docker-compose up -d
```
