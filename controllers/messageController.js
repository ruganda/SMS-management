import models from "../models/index";
import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import {getTokenData} from '../middleware/index'

const Message = models.Message;
const User = models.User
class MessageController {
  
   createMessage(req, res) {
    const {title, body, reciever} = req.body;
    const sender = getTokenData(req).id;
    
    console.log(sender);

    const message ={
        title,
        body,
        status: 'unRead',
        sender,
        reciever:parseInt(reciever)
    }
    Message.create(message)
      .then((message) => {
        res.status(201).send({
          message
        });
      })
      .catch(err=> res.status(500).send({err}))
  };

  viewAllRecieved(req, res){
    const currentUser = getTokenData(req).id;
    Message.findAll({where:{
      reciever: currentUser
    }})
    .then((messages)=>{
      res.status(200).send({
        messages
        })
    })
    .catch(err=> res.status(500).send({err}))

  }

  viewAllSent(req, res){
    const currentUser = getTokenData(req).id;
    Message.findAll({where:{
      sender: currentUser
    }})
    .then((messages)=>{
      res.status(200).send({
        messages
        })
    })
    .catch(err=> console.log(err))

  }

  updateStatus(req, res){
    Message.update(
      {status:"Read"},
      {where:{id:req.params.messageId}}
    )
    .then((result)=>{
      res.status(200).send({message:"status updated successfully"})
    })
    .catch(err=> res.status(500).send({err}))
  }

  deleteMessage(req, res){
    Message.destroy({where:{id:req.params.messageId}})
    .then(()=> res.status(200).send({message: "Message deleted"}))
    .catch(err=> res.status(500).send({err}))
  }
}


export default MessageController;
