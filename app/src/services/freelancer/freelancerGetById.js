/* eslint-disable no-useless-catch */
const logger = require('../../lib/logger/index')('services:getFreelancerById');
const Freelancer = require('../../models/freelancer');

async function getFreelancerById(freelancerId) {
  try {
    logger.debug(`About to get freelancer by id`);

    const result = await Freelancer.getInstance().findByCondition(null, { _id: freelancerId });
    if (result.length > 0) {
      return result[0];
    } else {
      return;
    }
  } catch (err) {
    throw err;
  }
}

module.exports = { 
  getFreelancerById
};
