import { check } from 'express-validator';

/**
 * A class that contains functions for all validations
 */
class Validate {
  /**
   * This return a validation chain for signup data.
   * @returns {[{ValidationChain}]}.
   */
  static signup() {
    return [
      check('firstName', 'First name should be valid.').isString(),
      check('lastName', 'Last name should be valid.').isString(),
      check('otherName', 'Last name should be valid.').isString(),
      check('category', 'Invalid email address, example: example@gmail.com.').isEmail(),
      check(
        'password',
        'Password should be provided and must be alphanumeric with atleast 8 charactors.'
      )
        .isLength({ min: 8 })
        .isAlphanumeric(),
      check('phoneNumber', 'Provided phone number is not valid.')
        .isString()
        .isLength({ min: 10, max: 13 }),
    ];
  }

  /**
   * validating User Inputs
   * @returns {Object} A user object with selected fields
   * excluing the password
   */
  static signin() {
    return [
      // username must be an phoneNumber
      check('phoneNumber', 'Provided phone number is not valid.')
        .isString()
        .isLength({ min: 10, max: 13 }),
      // password must be at least 5 chars long
      check(
        'password',
        'Invalid password, your password should be alphanumeric with atleast 8 charactors.'
      )
        .isLength({ min: 8 })
        .isAlphanumeric(),
    ];
  }

  /**
   * this function validate reset password form
   * @returns {Object} user response
   */
  static resetPassword() {
    return [
      check(
        'password',
        'Password should be provided and must be alphanumeric with atleast 8 charactors.'
      )
        .isLength({ min: 8 })
        .isAlphanumeric(),
      check(
        'confirmPassword',
        'confirm Password should be provided and must be alphanumeric with atleast 8 charactors.'
      )
        .isLength({ min: 8 })
        .isAlphanumeric(),
    ];
  }

  /**
   * this function send reset password link via email
   * @returns {Object} user response
   */
  static sendResetPasswordLink() {
    return [check('email', 'Invalid email address, example: example@gmail.com.').isEmail()];
  }

  /**
   * this function validate trip requests
   * @returns {Object} user response
   */
}
export default Validate;
