/* eslint-disable no-useless-catch */
const logger = require('../../lib/logger/index')('services:getAllHobby');
const Freelancer = require('../../models/freelancer');

async function getAllHobby() {
  try {
    logger.debug(`About to get all hobby`);
    
    const freelancers = await Freelancer.getInstance().findByCondition(null, { isDeleted: false });

    const uniqueHobbies = new Set();
    for (const freelancer of freelancers) {
      for (const hobby of freelancer.hobbies) {
        uniqueHobbies.add(hobby);
      }
    }

    return Array.from(uniqueHobbies);
  } catch (err) {
    throw err;
  }
}

module.exports = { 
  getAllHobby
};
