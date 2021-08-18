/* eslint-disable require-jsdoc */
const fs = require('fs');
const BaseJoi = require('joi');
const ImageExtension = require('joi-image-extension');
// const concat = require('concat-stream');
const response = require('../../helpers/response.helper');

const Joi = BaseJoi.extend(ImageExtension);

const validation = (req, res, schema, next) => {
  const { error } = schema.validate(req.body, req.params, { abortEarly: false });
  if (error) {
    const errorMessages = [];
    error.details.forEach((detail) => {
      errorMessages.push(detail.message.split('"').join(''));
    });
    const err = errorMessages.toString();
    return response.errorMessage(res, err, 400);
  }

  return next();
};

export default class InputValidation {
  static validateClient(req, res, next) {
    const schema = Joi.object({
      name: Joi.string(),
      phoneNumber: Joi.string()
        .trim()
        .regex(/^[0-9]{8,13}$/)
        .message('The phone number should be numbers of 8 to 10 digits.'),
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .message('email field should be a valid email address. e.g: johndoe@gmail.com.'),
      gender: Joi.string().valid('female', 'male'),
      state: Joi.string(),
      country: Joi.string(),
      deliveryAddress: Joi.string(),
    });
    validation(req, res, schema, next);
  }
}
