const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	const Member = sequelize.define('Member', {
		id: {
			field: 'id',
			type: DataTypes.STRING(45),
			primaryKey: true,
			allowNull: false,
		},
		name: {
			field: 'name',
			type: DataTypes.STRING(45),
			allowNull: false,
		},
		birthYear: {
			field: 'birth_year',
			type: DataTypes.INTEGER(45),
			allowNull: false,
		}
	});

	Member.associate = (models) => {
		models.Member.hasMany(models.Lent, {
			foreignKey: 'id',
		});
	}

	Member.getMembers = () => Member.findAll({
		raw: true,
	})

	Member.getMember = (id) => Member.findOne({
		where: {
			id,
		},
		raw: true,
	});

	Member.getMemberByName = (name) => Member.findAll({
		where: {
			name : { [Sequelize.Op.like] : '%' + name + '%' },
		},
		raw: true,
	});

	Member.getMemberByBirthYear = (birthYear) => Member.findAll({
		where: {
			birthYear,
		},
		raw: true,
	});

	Member.createMember = (data) => Member.create({
		id: data.id,
		name: data.name,
		birthYear: data.birthYear,
	});

	Member.updateMember = (id, data) => Member.update(data, {
		where: {
			id,
		},
	});

	Member.deleteMember = (id) => Member.destroy({
		where: {
			id,
		},
	});

	return Member;
}