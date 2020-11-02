'use strict';

const logger = require('../../lib/logger/index')('routes:getFreelancerHandler');
const util = require('util');
const { validatePayload } = require('../../lib/helperFunction');
const { createError } = require('../../lib/errorHandler/index');
const { getFreelancerById, getAllFreelancer } = require('../../services/freelancer');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

async function getFreelancerHandler(req, res, next) {
  try {
    logger.debug(`Get freelancer controller activated`);
    const freelancerId = req.params.freelancerId;

    let result;
    if (freelancerId) {
      const idResult = await validatePayload(freelancerId, 'Id');
      if (!idResult.isValid) {
        return next(createError.BadRequest(idResult.errorMessage));
      }

      result = await getFreelancerById(freelancerId);
      const httpStatusCode = result ? 200 : 404; // 200 - OK; 404 - No Found
      return res.status(httpStatusCode).json(result);
    } else {
      result = await getAllFreelancer();
      const httpStatusCode = (result && result.length > 0) ? 200 : 204; // 200 - OK; 204 - No Content
      return res.status(httpStatusCode).json(result);
    }
  }  catch (err) {
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

module.exports = getFreelancerHandler;
