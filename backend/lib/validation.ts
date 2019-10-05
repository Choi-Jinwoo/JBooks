const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));

exports.validateCreateMember = async body => {
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

exports.validateModifyMember = async body => {
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

exports.validateRent = async body => {
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

exports.validateExtend = async body => {
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
