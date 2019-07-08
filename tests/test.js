import app from '../server.js';
import request from 'supertest';
import models from "../models/index";
const expect = require('chai').expect;

// models.User.sync({ force: true })
// models.Message.sync({force:true})

describe('Test user routes', ()=>{
  models.User.sync({ force: false })
  it('should add a contact', (done)=>{
    request(app).post('/user')
    .send({
      "name": "Test user",
      "phoneNumber": "0779850746"
    })
   .end((err, res)=>{
    expect(res.status).to.equal(200)
    expect(res.body.user.name).to.equal("Test user")
    done();
   })
   
  })
})