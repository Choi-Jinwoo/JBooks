const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));

const validateCreateMember = async (body: any) => {
	const schema = Joi.object().keys({
		id: Joi.string().required(),
		name: Joi.string().required(),
		birthYear: Joi.number()
			.integer()
			.required()
	});
	const result = schema.validate(body);
	if (result.error) {
		throw result.error;
	}
	return schema.validate(body);
};

const validateModifyMember = async (body: any) => {
	const schema = Joi.object().keys({
		name: Joi.string(),
		birthYear: Joi.number()
	});
	const result = schema.validate(body);
	if (result.error) {
		throw result.error;
	}
	return schema.validate(body);
};

const validateRent = async (body: any) => {
	const schema = Joi.object().keys({
		id: Joi.string().required(),
		name: Joi.string().required(),
		returnDate: Joi.date()
			.format("YYYY-MM-DD")
			.required()
	});
	const result = schema.validate(body);
	if (result.error) {
		throw result.error;
	}
	return schema.validate(body);
};

const validateExtend = async (body: any) => {
	const schema = Joi.object().keys({
		returnDate: Joi.date()
			.format("YYYY-MM-DD")
			.required()
	});
	const result = schema.validate(body);
	if (result.error) {
		throw result.error;
	}
	return schema.validate(body);
};

export default {
	validateCreateMember,
	validateModifyMember,
	validateRent,
	validateExtend
}
