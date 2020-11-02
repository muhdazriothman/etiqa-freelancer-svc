/* eslint-disable no-useless-catch */
const logger = require('../../lib/logger/index')('services:getAllFreelancer');
const Freeelancer = require('../../models/freelancer');

async function getAllFreelancer() {
  try {
    logger.debug(`About to get all freelancer`);
    
    const result = await Freeelancer.getInstance().findByCondition(null, { isDeleted: false });
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = { 
  getAllFreelancer
};
