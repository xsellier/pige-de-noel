'use strict'

const request = require('supertest')
const path = require('path')
const expect = require('chai').expect
const async = require('async')

const server = require('../../lib')

const config = require('config')

describe(`${path.relative(process.cwd(), __filename)} experiment`, () => {
  beforeEach((done) => {
    request(server)
      .delete('/api/reset')
      .type('json')
      .expect(204)
      .end(done)
  })

  it('Should be able to retrieve the configuration', (done) => {
    request(server)
      .get('/api/config')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(err).to.not.exist
        expect(res.body).to.deep.equal(config.draw)

        done()
      })
  })

  it('Should be able to retrieve the current state', (done) => {
    request(server)
      .get('/api/state')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(err).to.not.exist
        expect(res.body.state).to.exist

        done()
      })
  })

  it('Should be able to add a member without error', (done) => {
    request(server)
      .post('/api/member')
      .type('json')
      .send({ member: 'Robert Redford' })
      .expect(204)
      .end(done)
  })

  it('Should be able to add a couple without error', (done) => {
    request(server)
      .post('/api/couple')
      .type('json')
      .send({ couple: ['Lara Fabian', 'Céline Dion'] })
      .expect(204)
      .end(done)
  })

  it('Should be able to add some couples and then to perform a draw and to get a match', (done) => {
    let tasks = []
    const couples = [
      ['Lara Fabian', 'Céline Dion'],
      ['Francis Cabrel', 'Emma Watson'],
      ['Robert Redford', 'Noham Chomsky']
    ]

    couples.forEach((couple) => {
      tasks.push((next) => {
        request(server)
          .post('/api/couple')
          .type('json')
          .send({ couple })
          .expect(204)
          .end(next)
      })
    })

    tasks.push((next) => {
      request(server)
        .post('/api/draw')
        .type('json')
        .expect(204)
        .end(next)
    })

    couples.forEach((couple) => {
      couple.forEach((member) => {
        tasks.push((next) => {
          request(server)
            .get(`/api/match/${member}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              expect(err).to.not.exist
              expect(res.body.match).to.exist

              next()
            })
        })
      })
    })

    async.series(tasks, done)
  })
})