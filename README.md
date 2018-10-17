# Description

This is a minimal API done using Koa and Redis for counting clicks.

It exposes just 2 calls:

* `PUT /click` - Increments the counter by 1 and returns current count.
* `GET /clicks` - Returns the JSON with clicks count.

# Requirements

This app requires Redis, and assumes it's available at `localhost:6379`

# Configuration

There are few environment variables you can set:

* `REDIS_HOST` - Default: `localhost`
* `REDIS_PORT` - Default: `6379`
* `LISTEN_PORT` - Default: `3000`

# Usage

For development use:
```
npm run start
```
For building use:
```
npm run build
```
To create the docker image use:
```
npm run image
```
To push the image use:
```
npm run push
```
