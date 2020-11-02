'use strict';

const logger = require('../../lib/logger/index')('routes:updateFreelancerHandler');
const util = require('util');
const { validatePayload } = require('../../lib/helperFunction');
const { createError } = require('../../lib/errorHandler/index');
const { updateFreelancer } = require('../../services/freelancer');
const Freelancer = require('../../models/freelancer');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

async function updateFreelancerHandler(req, res, next) {
  try {
    logger.debug(`Update freelancer controller activated`);
    const freelancerId = req.params.freelancerId;
    const payload = req.body;

    const validationQueue = [];
    validationQueue.push(await validatePayload(freelancerId, 'Id')
      .then(result => {
        if (!result.isValid) {
          return next(createError.BadRequest([result.errorMessage]));
        }
      })
    );
    validationQueue.push(await validatePayload(payload, Freelancer.getSchemaName().update)
      .then(result => {
        if (!result.isValid) {
          return next(createError.BadRequest([result.errorMessage]));
        }
      })
    );
    await Promise.all(validationQueue);

    const result = await updateFreelancer(freelancerId, payload);
    return res.status(200).json(result);
  } catch (err) {
    if (
      err.errorName === 'BadRequestError' ||
      err.errorName === 'ConflictError' ||
      err.errorName === 'NotFoundError' || 
      err.errorName === 'ForbiddenError'
    ) {
      return res.status(err.status).json(err);
    }
    return next(err);
  }
}

module.exports = updateFreelancerHandler;
