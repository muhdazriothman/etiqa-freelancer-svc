/* eslint-disable no-useless-catch */
const logger = require('../../lib/logger/index')('services:updateFreelancer');
const { createError } = require('../../lib/errorHandler/index');
const { getFreelancerById } = require('./freelancerGetById');
const { updateAuditTrail } = require('../base-service');
const Freelancer = require('../../models/freelancer');

async function updateFreelancer(freelancerId, freelancerData) {
  try {
    logger.debug(`About to update freelancer`);
    
    const freelancerInDb = await getFreelancerById(freelancerId);
    if (!freelancerInDb) {
      throw createError.NotFound([`Freelancer not found`]);
    }
    if (freelancerInDb.version !== freelancerData.version) {
      throw createError.Conflict([`Freelancer has been updated by another freelancer`]);
    }
    if (freelancerInDb.email !== freelancerData.email) {
      throw createError.Conflict([`Freelancer email cannot be modified`]);
    }
    
    let updateFreelancer = { ...freelancerData };
    updateFreelancer = updateAuditTrail(updateFreelancer);

    const result = await Freelancer.getInstance().update(freelancerId, updateFreelancer);
    return result;
  } catch (err) {
    throw err;
  }
}
module.exports = { 
  updateFreelancer
};
