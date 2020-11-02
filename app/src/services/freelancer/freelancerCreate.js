/* eslint-disable no-useless-catch */
const logger = require('../../lib/logger/index')('services:createFreelancer');
const { createError } = require('../../lib/errorHandler/index');
const { createAuditTrail } = require('../base-service');
const Freelancer = require('../../models/freelancer');

async function createFreelancer(freelancerData) {
  try {
    logger.debug(`About to create freelancer`);

    const sameEmailFreelancer = await Freelancer.getInstance().findByCondition(null, { email: freelancerData.email.toUpperCase(), isDeleted: false });
    if (sameEmailFreelancer.length > 0) {
      throw createError.Conflict([`Duplicate email found`]);
    }

    let newFreelancer = { ...freelancerData };
    newFreelancer.email = newFreelancer.email.toUpperCase();
    newFreelancer = createAuditTrail(newFreelancer);

    const result = await Freelancer.getInstance().insert(newFreelancer);
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = { 
  createFreelancer
};