'use strict';

const logger = require('../../lib/logger/index')('routes:deleteFreelancerHandler');
const util = require('util');
const { validatePayload } = require('../../lib/helperFunction');
const { createError } = require('../../lib/errorHandler/index');
const { deleteFreelancer } = require('../../services/freelancer');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

async function deleteFreelancerHandler(req, res, next) {
  try {
    logger.debug(`Delete freelancer controller activated`);
    const freelancerId = req.params.freelancerId;

    const idResult = await validatePayload(freelancerId, 'Id');
    if (!idResult.isValid) {
      return next(createError.BadRequest(idResult.errorMessage));
    }

    const result = await deleteFreelancer(freelancerId);
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

module.exports = deleteFreelancerHandler;
