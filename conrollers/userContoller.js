import models from "../models/index";


class UserController {
   createUser(req, res) {
    const User = models.User;
    const {name, phoneNumber} = req.body;

    User.findOrCreate({
      where: { name},
      defaults: { phoneNumber }
    })
      .then(([user, created]) => {
        res.send({
          user,
          created
        });
      })
      .catch(err => console.log(chalk.red(err)));
  };
}

export default UserController;