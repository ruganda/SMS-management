import models from "../models/index";


class MessageController {
   createMessage(req, res) {
    const User = models.Message;
    const {title, body, reciever} = req.body;
    const message ={
        tittle,
        body,
        status:'sent',
        reciever,
        sender:'Me'
    }
    Message.create(message)
      .then(([user, created]) => {
        res.send({
          user,
          created
        });
      })
      .catch(err => console.log(chalk.red(err)));
  };
}

export default MessageController;