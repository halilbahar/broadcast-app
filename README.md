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