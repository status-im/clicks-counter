# Description

This is a minimal API done using Koa and Redis for counting clicks.

It exposes just 2 calls:

* `PUT /clicks/:id` - Bumps the counter by 1 and returns current count for ID.
* `GET /clicks/:id` - Returns the JSON with clicks count for the ID.
* `GET /clicks` - Returns the JSON with all the clicks counts.

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
