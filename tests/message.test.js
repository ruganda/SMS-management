import app from '../server.js';
import request from 'supertest';
const expect = require('chai').expect;

process.NODE_ENV ="test"
let accessToken;
const getUserToken = (userData) => {
   
    const res = ( async ()=> await request(app).post('/user').send(userData)
    )();
    console.log (res)
    return res

}

const testUser ={
    name:"Mubarak",
    phoneNumber:"0779850746"
}

describe('Test message routes',  ()=>{
  
    let token
  
    beforeEach(async()=>{
        token = await getUserToken(testUser);
    })

  it('should  send a message',  (done)=>{
    // request(app).headers['authorization']= `Bearer ${getUserToken(testUser)}`
  
    const message ={
    "title": "My first test message",
    "body":"This is what I wanted to tell you",
    "reciever": 1
    }
    console.log(  getUserToken(testUser), 'tttttttyyyyyyyyyy')
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