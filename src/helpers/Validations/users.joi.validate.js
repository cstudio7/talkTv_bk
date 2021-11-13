/* eslint-disable require-jsdoc */
import Joi from 'joi';
import response from '../response.helper';

// import passwordComplexity from "joi-password-complexity";

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
  static validateSignup(req, res, next) {
    const schema = Joi.object({
      fullName: Joi.string().empty(''),
      password: Joi.string()
          .regex(/^(?=.*[a-z])(?=.*[0-9])(?=.{6,})/)
          .message(
              'password field should contain at least 6 characters, at least 1 lowercase, 1 uppercase and 1 number.'
          )
          .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .message('email field should be a valid email address. e.g: johndoe@gmail.com.')
        .required(),
      gender: Joi.string().valid('female', 'male'),
      userName: Joi.string(),
      country: Joi.string(),
      authType: Joi.string().valid('user', 'employee', 'admin'),
      phoneNumber: Joi.string()
        .trim()
        .regex(/^[0-9]{8,23}$/)
        .message('The phone number should be numbers of 8 to 10 digits.'),
    });
    validation(req, res, schema, next);
  }

  static validateLogin(req, res, next) {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .message('email field should be a valid email address. e.g: johndoe@gmail.com.'),
      password: Joi.string()
          .regex(/^(?=.*[a-z])(?=.*[0-9])(?=.{6,})/)
        .message('Invalid Login detail')
        .required(),
    });
    validation(req, res, schema, next);
  }

  static validateActivateByCode(req, res, next) {
    const schema = Joi.object({
      phoneNumber: Joi.string()
        .trim()
        .regex(/^[0-9]{6,23}$/)
        .message('The phone number should be numbers of 8 to 10 digits.'),
      code: Joi.string()
        .trim()
        .required()
        .length(6)
        .message('the code is not correct'),
    });
    validation(req, res, schema, next);
  }

  static validateResetPasswordPh(req, res, next) {
    const schema = Joi.object({
      password: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,])(?=.{7,})/)
        .message(
          'password field should contain at least 7 characters, at least 1 lowercase, 1 uppercase and 1 number and a special character.'
        )
        .required(),
      confirmPassword: Joi.string(),
      code: Joi.string()
        .trim()
        .required()
        .length(6)
        .message('the code is not correct'),
    });
    validation(req, res, schema, next);
  }

  static validateResetPassword(req, res, next) {
    const schema = Joi.object({
      code: Joi.string()
          .trim()
          .required()
          .length(6)
          .message('the code is not correct'),
      phoneNumber: Joi.string()
          .trim()
          .regex(/^[0-9]{6,23}$/)
          .message('The phone number should be numbers of 8 to 10 digits.'),
      password: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,])(?=.{7,})/)
        .message(
          'password field should contain at least 7 characters, at least 1 lowercase, 1 uppercase and 1 number and a special character.'
        )
        .required(),
      confirmPassword: Joi.string(),
    });
    validation(req, res, schema, next);
  }

  static validateResendCode(req, res, next) {
    const schema = Joi.object({
      phoneNumber: Joi.string()
        .trim()
        .regex(/^[0-9]{8,13}$/)
        .message('The phone number should be numbers of 8 to 10 digits.'),
    });
    validation(req, res, schema, next);
  }

  static validateGoogleSignUp(req, res, next) {
    const schema = Joi.object({
      category: Joi.string().valid('tailor', 'weaver', 'fashionista', 'agent'),
      password: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,])(?=.{7,})/)
        .message(
          'password field should contain at least 7 characters, at least 1 lowercase, 1 uppercase and 1 number and a special character.'
        )
        .required(),
    });
    validation(req, res, schema, next);
  }

  static validateResendEmail(req, res, next) {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .message('email field should be a valid email address. e.g: johndoe@gmail.com.'),
    });
    validation(req, res, schema, next);
  }
}
