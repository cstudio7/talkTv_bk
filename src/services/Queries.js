/* eslint-disable valid-jsdoc */
import { Op } from 'sequelize';
// import db from '../database/models';
// import response from '../helpers/response.helper';

const getPagination = (page, size) => {
  if (!page || Number.isNaN(page)) page = 1;
  if (page < 1) page = 1;
  const limit = size || 20;
  const offset = page ? (page - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (privateMessages, page, limit) => {
  const { count: totalItems, rows: data } = privateMessages;
  let currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  if (currentPage > totalPages) currentPage = totalPages;
  let prevPage = currentPage === 1 ? 1 : currentPage - 1;
  if (prevPage === -1) prevPage = 0;
  const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
  return {
    data,
    meta: {
      totalItems,
      totalPages,
      currentPage,
      prevPage,
      nextPage,
      perPage: limit,
    },
  };
};

/**
 * class for responses
 */
class Queries {
  /**
   * creating user query
   * @param {string} table users table in database.
   * @param {string} data the data to be inputed in database.
   * @returns {array} data the data to be returned.
   */
  static async create(table, data) {
    try {
      const datas = await table.create(data);
      return datas;
    } catch (error) {
      return error;
    }
  }

  /**
   *
   * This method will be used to get all messages between a sender and receiver upon login
   * @param {String} table the name of the table to updated
   * @param {integer} senderId the id of the user who sent the message
   * @param {integer} receiverId the id of the connected user
   * @returns {object} messages retrieved
   */
  static async getPrivateMessage(table, senderId, receiverId, page, size) {
    try {
      const { limit, offset } = getPagination(page, size);
      const privateMessages = await table.findAndCountAll({
        limit,
        offset,
        where: {
          [Op.or]: [
            {
              [Op.and]: [{ senderId }, { receiverId }],
            },
            {
              [Op.and]: [{ senderId: receiverId }, { receiverId: senderId }],
            },
          ],
        },
        order: [['createdAt', 'DESC']],
      });

      const result = await getPagingData(privateMessages, page, limit);
      return result;
    } catch (error) {
      return error;
    }
  }
}
export default Queries;
