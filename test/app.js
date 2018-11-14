import request from 'supertest'
import app from '../src/app'

test('incrementing clicks works', async () => {
    let resp = await request(app.callback()).put('/clicks/id')
    expect(resp.status).toBe(201)
})

test('clicks works', async () => {
    let resp = await request(app.callback()).get('/clicks')
    expect(resp.status).toBe(200)
})
