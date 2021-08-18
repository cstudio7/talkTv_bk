const fs = require('fs');
const BaseJoi = require('joi');
const ImageExtension = require('joi-image-extension');
const concat = require('concat-stream');

const Joi = BaseJoi.extend(ImageExtension);

const schema = Joi.image().minDimensions(100, 50);

fs.createReadStream('./avatar.jpg').pipe(
  concat((image) => {
    Joi.validate(image, schema, (err, value) => {
      // Handle validation result...
    });
  })
);
