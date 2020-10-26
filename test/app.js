import sinon from 'sinon'
import request from 'supertest'

import App from '../src/app'
import Counter from '../src/counter'

let counter
let app
let allCounters = {
  'aaaa:bbb': 1,
  'bbbb:ccc': 2,
  'cccc:ddd': 3
}

beforeAll(() => {
  counter = sinon.createStubInstance(Counter, {
    state: 1,
    list: allCounters,
    incr: 1,
    metrics: {metrics:1},
  })
  app = App(counter)
})

test('incrementing clicks works', async () => {
  let resp = await request(app.callback()).post('/clicks/aaaa:bbb')
  expect(resp.status).toBe(201)
  expect(resp.type).toBe('application/json')
  expect(resp.body).toEqual({'aaaa:bbb': 1})
  expect(counter.incr.calledWith('aaaa:bbb'))
})

test('wrong id fails', async () => {
  let resp = await request(app.callback()).post('/clicks/INVALID')
  expect(resp.status).toBe(405)
  expect(resp.type).toBe('text/plain')
})

test('querying clicks works', async () => {
  let resp = await request(app.callback()).get('/clicks/bbbb:ccc')
  expect(resp.status).toBe(200)
  expect(resp.type).toBe('application/json')
  expect(resp.body).toEqual({'bbbb:ccc': 1})
})

test('clicks works', async () => {
  let resp = await request(app.callback()).get('/clicks')
  expect(resp.status).toBe(200)
  expect(resp.type).toBe('application/json')
  expect(resp.body).toEqual(allCounters)
})

test('healhcheck works', async () => {
  let resp = await request(app.callback()).get('/health')
  expect(resp.status).toBe(200)
  expect(resp.body).toEqual({status: 'OK'})
})

test('metrics work', async () => {
  let resp = await request(app.callback()).get('/metrics')
  expect(resp.status).toBe(200)
  expect(resp.body).toEqual({metrics:1})
})
