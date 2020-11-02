/* eslint-disable no-useless-catch */
const logger = require('../../lib/logger/index')('services:deleteFreelancer');
const { createError } = require('../../lib/errorHandler/index');
const { getFreelancerById } = require('./freelancerGetById');
const { updateAuditTrail } = require('../base-service');
const Freelancer = require('../../models/freelancer');

async function deleteFreelancer(freelancerId) {
  try {
    logger.debug(`About to delete freelancer`);

    const freelancerInDb = await getFreelancerById(freelancerId);
    if (!freelancerInDb) {
      throw createError.NotFound([`Free;ancer not found`]);
    }
  
    let updateFreelancer = { isDeleted: true, version: freelancerInDb.version };
    updateFreelancer = updateAuditTrail(updateFreelancer);

    const result = await Freelancer.getInstance().update(freelancerId, updateFreelancer);
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = { 
  deleteFreelancer
};
