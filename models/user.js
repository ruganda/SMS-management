
const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Message, { foreignKey: 'sender', allowNull: false });
    User.hasMany(models.Message, {forreignKey: 'reciever', allNull: false})

  };
  return User;
};

export default userModel;