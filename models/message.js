
const messageModel = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User, { foreignKey: 'sender', onDelete: 'CASCADE' });
    Message.belongsTo(models.User, { foreignKey: 'reciever', onDelete: 'CASCADE' });
  };
  return Message;
};
 export default messageModel;
