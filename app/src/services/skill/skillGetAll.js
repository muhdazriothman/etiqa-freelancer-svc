/* eslint-disable no-useless-catch */
const logger = require('../../lib/logger/index')('services:getAllSkill');
const Freelancer = require('../../models/freelancer');

async function getAllSkill() {
  try {
    logger.debug(`About to get all skill`);
    
    const freelancers = await Freelancer.getInstance().findByCondition(null, { isDeleted: false });

    const uniqueSkills = new Set();
    for (const freelancer of freelancers) {
      for (const skill of freelancer.skills) {
        uniqueSkills.add(skill);
      }
    }

    return Array.from(uniqueSkills);
  } catch (err) {
    throw err;
  }
}

module.exports = { 
  getAllSkill
};
