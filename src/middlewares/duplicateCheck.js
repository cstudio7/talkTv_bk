// import db from "../database/models";
// import response from "../helpers/response.helper";
//
// class duplicateCheck {
//     /**
//      * signup a user and saving user data in the database
//      * @param {Object} req The request object
//      * @param {Object} res The response object
//      * @returns {Object} A user object with selected fields
//      */
//     static async checkMedia(req, res) {
//         const existingPhoto = await db.media.findOne({where: {name}});
//         if(existingPhoto || (existingPhoto.tailorId === id)){
//             return response.errorMessage(res, 'Photo Already Exist', 403);
//         }
//     }
//
// }
//
// export default duplicateCheck;
