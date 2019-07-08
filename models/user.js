
const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Message, {foreignKey: 'sender'}, { onDelete: 'cascade'} )
    User.hasMany(models.Message, {foreignKey: 'reciever'}, { onDelete: 'cascade'})
  };
  return User;
};

export default userModel;