const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../routes/admin.js');
const conn = require('../../../configurations/db.js');

const id = "62bb0fe205ad1b2869452e44"

describe('admin functionalities', () => {
    before((done) => {
        conn.connect()
        .then(() => done())
        .catch((err) => done(err));
    })

    it('OK, accepting user requests', async () => {
        request(app).post(`/accept/${id}`)
        .send()
        .then((res) => {
            
            const body = res.body;
            expect(body).to.cotain.property('message');
            
        })
        .catch((err) => console.log(err));
    })

    it('OK, accepting user requests', async () => {
        request(app).post(`/reject/${id}`)
        .send()
        .then((res) => {
            
            const body = res.body;
            expect(body).to.cotain.property('message');
            
        })
        .catch((err) => console.log(err));
    })


})