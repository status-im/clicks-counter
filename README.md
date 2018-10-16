# Description

This is a minimal API done using Koa and Redis for counting clicks.

It exposes just 2 calls:

* `PUT /click` - Increments the counter by 1 and returns current count.
* `GET /clicks` - Returns the JSON with clicks count.

# Usage

For development use:
```
npm run start
```
For building use:
```
npm run build
```
