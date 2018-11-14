import sinon from 'sinon'
import request from 'supertest'

import App from '../src/app'
import Counter from '../src/counter'

let counter
let app
let allCounters = {A: 1, B: 2, C: 3}

beforeAll(() => {
  counter = sinon.createStubInstance(Counter, {
    state: 1, list: allCounters,
  })
  app = App(counter)
})

//beforeEach(() => {
//  counter.reset()
//})

test('incrementing clicks works', async () => {
  let resp = await request(app.callback()).put('/clicks/A')
  expect(resp.status).toBe(201)
  expect(resp.type).toBe('application/json')
  expect(resp.body).toEqual({A: 1})
  expect(counter.incr.calledWith('A'))
})

test('querying clicks works', async () => {
  let resp = await request(app.callback()).get('/clicks/B')
  expect(resp.status).toBe(200)
  expect(resp.type).toBe('application/json')
  expect(resp.body).toEqual({B: 1})
})

test('clicks works', async () => {
  let resp = await request(app.callback()).get('/clicks')
  expect(resp.status).toBe(200)
  expect(resp.type).toBe('application/json')
  expect(resp.body).toEqual(allCounters)
})
