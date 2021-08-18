import UserServices from '../services/user.service';

/**
 * Custom error validator middleware
 * */
export default {
  /**
   * Validate the request body object
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {Array} errors
   * */

  signup: async (req, res, next) => {
    const { phoneNumber, password } = req.body;

    // Array to hold all errors
    const errors = [];

    // phoneNumber is required, must be a valid email and unique
    if (phoneNumber) {
      if (!phoneNumber.trim()) {
        errors.push('phoneNumber can not be empty');
      }
      if (!(phoneNumber.trim().length === 13)) {
        errors.push('please check the mobile number');
      }
      // phoneNumber is unique
      try {
        if (phoneNumber.trim()) {
          const userWithPhone = await UserServices.findUserByPhone(phoneNumber);
          if (userWithPhone) {
            errors.push('user with this phoneNumber already exists');
          }
        }
      } catch (e) {
        next(e);
      }
    } else {
      errors.push('phone number is required');
    }

    // password is required and must more than or equal to 8 alphanumeric characters
    if (password) {
      if (!password.trim()) {
        errors.push('password can not be empty');
      }
      if (!(password.trim().length >= 8)) {
        errors.push('password length can not be lower than 8');
      }
      // if (password.trim().length > 0 && !/^[a-zA-Z0-9]{1,}$/g.test(password.trim())) {
      //   errors.push('password must be alphanumeric');
      // }
    } else {
      errors.push('password is required');
    }

    return errors.length > 0
      ? res.status(400).json({
        status: res.statusCode,
        errors
      })
      : next();
  },

  login: async (req, res, next) => {
    const { password } = req.body;
    const email = req.body.email || '4444444444444';
    const phoneNumber = req.body.phoneNumber || '4444444444444';

    // Array to hold all errors
    const errors = [];

    // phone number is required, must be a valid number and unique
    if (phoneNumber) {
      if (!phoneNumber.trim()) {
        errors.push('phoneNumber can not be empty');
      }

      if (!(phoneNumber.trim().length === 13)) {
        errors.push('Incorrect Phone Number');
      }

      // phone number is unique
      try {
        if (phoneNumber.trim()) {
          const userWithPhone = await UserServices.findUserByPhone(phoneNumber);
          if (!userWithPhone && phoneNumber !== '4444444444444') {
            errors.push("user with this number doesn't exists");
          }
        }
      } catch (e) {
        next(e);
      }
    } else {
      errors.push('phone number is required');
    }

    // password is required and must more than or equal to 8 alphanumeric characters
    if (password) {
      if (!password.trim()) {
        errors.push('password can not be empty');
      }
      if (!(password.trim().length >= 8)) {
        errors.push('password length can not be lower than 8');
      }
    } else {
      errors.push('password is required');
    }
    return errors.length > 0
      ? res.status(400).json({
        status: res.statusCode,
        errors
      })
      : next();
  },
  /**
     * Validate the request body object
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {Array} errors
     * */

  verify: async (req, res, next) => {
    const { phoneNumber, code } = req.body;

    // Array to hold all errors
    const errors = [];

    // phoneNumber is required, must be a valid email and unique
    if (phoneNumber) {
      // phoneNumber is unique
      try {
        // phoneNumber is unique
        if (phoneNumber.trim()) {
          const userWithPhone = await UserServices.findUserByPhone(phoneNumber);
          if (!userWithPhone) {
            errors.push("user with this number doesn't exists");
          }
        }
        // phoneNumber and code is unique
        if (phoneNumber.trim()) {
          const userWithPhone = await UserServices.findUserByPhoneAndCode(phoneNumber, code);
          if (!userWithPhone) {
            errors.push('Phone Number and code does not match');
          }
        }
      } catch (e) {
        next(e);
      }
    } else {
      errors.push('phone number is required');
    }
    // code is required
    if (code) {
      if (!code.trim()) {
        errors.push('password can not be empty');
      }
      // check for alphabets
      // if (/^[a-zA-Z0]/g.test(code.trim())) {
      //     errors.push('Code is not correct');
      // }
    } else {
      errors.push('Code is required');
    }

    return errors.length > 0
      ? res.status(400).json({
        status: res.statusCode,
        errors
      })
      : next();
  },
};
