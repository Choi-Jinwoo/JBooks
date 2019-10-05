module.exports = (sequelize, DataTypes): object => {
  const Sequelize = require("sequelize");

  const Lent = sequelize.define("Lent", {
    idx: {
      field: "idx",
      type: DataTypes.INTEGER(45),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    id: {
      field: "id",
      type: DataTypes.STRING(45),
      allowNull: false
    },
    name: {
      field: "name",
      type: DataTypes.STRING(45),
      allowNull: false
    },
    lentDate: {
      field: "lent_date",
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    returnDate: {
      field: "return_date",
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  Lent.associate = models => {
    models.Lent.belongsTo(models.Member, {
      foreignKey: "id"
    });
  };

  Lent.getLent = idx =>
    Lent.findOne({
      where: {
        idx
      },
      raw: true
    });

  Lent.getLents = () =>
    Lent.findAll({
      raw: true
    });

  Lent.getLentByMember = id =>
    Lent.findAll({
      where: {
        id
      },
      raw: true
    });

  Lent.searchLents = name =>
    Lent.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: "%" + name + "%"
        }
      }
    });

  Lent.getLentByName = name =>
    Lent.findAll({
      where: {
        name
      },
      raw: true
    });

  Lent.createLent = data =>
    Lent.create({
      id: data.id,
      name: data.name,
      returnDate: data.returnDate
    });

  Lent.updateLent = (idx, data) =>
    Lent.update(data, {
      where: {
        idx
      }
    });

  Lent.deleteLent = idx =>
    Lent.destroy({
      where: {
        idx
      }
    });

  return Lent;
};
