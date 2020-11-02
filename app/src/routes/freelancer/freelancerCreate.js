'use strict';

const logger = require('../../lib/logger/index')('routes:createFreelancerHandler');
const util = require('util');
const { validatePayload } = require('../../lib/helperFunction');
const { createError } = require('../../lib/errorHandler/index');
const { createFreelancer } = require('../../services/freelancer');
const Freelancer = require('../../models/freelancer');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

async function createFreelancerHandler(req, res, next) {
  try {
    logger.debug(`Create freelancer controller activated`);
    const payload = req.body;

    const payloadResult = await validatePayload(payload, Freelancer.getSchemaName().create);
    if (!payloadResult.isValid) {
      return next(createError.BadRequest(payloadResult.errorMessage));
    }

    const result = await createFreelancer(payload);
    return res.status(201).json(result);
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

module.exports = createFreelancerHandler;
