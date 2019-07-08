import models from "../models/index";
import jwt from 'jsonwebtoken';
import chalk from 'chalk';

const User = models.User;
class UserController {
   createUser(req, res) {
    const {name, phoneNumber} = req.body;

    // User.sync({ force: true }).then(() => {
    //   // Now the `users` table in the database corresponds to the model definition
    //   return User.create({
    //     name, phoneNumber
    //   });
    // });

    User.findOrCreate({
      where: { name},
      defaults: { phoneNumber }
    })
      .then(([user, created]) => {
        console.log(chalk.blue('logged', process.env.SECRET_KEY))
        jwt.sign({user}, 'secret', (err, token)=>{
          if(err) {
            res.send({err})
          }
          else{
            res.json({
              user,
              created,
              token
            });
          }
        })
      })
      .catch(err => console.log(chalk.red(err)));
  };

  deleteContact(req, res){
    const contact = req.params.contact
    User.destroy({where:{
      phoneNumber:contact
    }})
    .then((result)=> {console.log(result, 'deleted'); res.send({message: "Contact deleted"})})
    .catch(err=> res.status(500).send({err}))
  }

}

export default UserController;