import app from '../server.js';
import request from 'supertest';
import models from "../models"
const expect = require('chai').expect;

// models.User.sync({ force: true })
models.Message.sync({force: true})

let accessToken;
const getUserToken = (userData) => {
    const res = ( async ()=> await request(app).post('/user').send(userData)
    )();
    return res
}

const getAllUsers = ()=>{
  const res = ( async ()=> await request(app).get('/user').send()
    )();
  return res
}

const createMessage =()=>{
  const res = ( async ()=> await request(app).post('/message').send(message)
    )();
  return res
}

const testUser ={
    name:"Mubarak2",
    phoneNumber:"0779545785"
}


describe('Test message routes',  ()=>{
    models.Message.sync({force: true})
    let token;
    let users;
    

    beforeEach(async()=>{
        token = await getUserToken(testUser);
        users = await getAllUsers()
        const testMessage  = {
          "title": "My first test message",
          "body":"This is what I wanted to tell you",
          reciever: users.body.contacts[0].id
          }
        createMessage(testMessage)
    })

  it('should  send a message',  (done)=>{
    const message ={
    "title": "My first test message",
    "body":"This is what I wanted to tell you",
    reciever: users.body.contacts[0].id
    }
    request(app).post('/message')
    .send(message)
    .set('Authorization', `Bearer ${token.body.token}`)
   .end((err, res)=>{
     
    expect(res.status).to.equal(201)
    expect(res.body.message.title).to.equal("My first test message")
    done();
   })
   
  })

  it('should  view all sent messages', (done)=>{
    request(app).get('/sent')
    .set('Authorization', `Bearer ${token.body.token}`)
     .end((err, res)=>{
     expect(res.status).to.equal(200)
     expect(res.body.messages[0].title).to.equal('My first test message')
     done();
    })
  })

  it('should  view all recieved messages', (done)=>{
    request(app).get('/recieved')
    .set('Authorization', `Bearer ${token.body.token}`)
    .end((err, res)=>{
    expect(res.status).to.equal(200)
    done();
   })
  })

  it('should  update the status to read', (done)=>{
    request(app).patch('/recieved/1')
    .set('Authorization', `Bearer ${token.body.token}`)
    .end((err, res)=>{
    expect(res.status).to.equal(200)
    done();
   })
  })

  it('should  delete a message successfully', (done)=>{
    request(app).delete('/recieved/1')
    .set('Authorization', `Bearer ${token.body.token}`)
    .end((err, res)=>{
    expect(res.status).to.equal(200)
    done();
   })
  })

  it('should  delete a user successfully', (done)=>{
    request(app).delete('/user/0779850746')
    .set('Authorization', `Bearer ${token.body.token}`)
    .end((err, res)=>{
    expect(res.status).to.equal(200)
    done();
   })
  })
})