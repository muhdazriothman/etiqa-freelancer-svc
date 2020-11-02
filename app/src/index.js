'use strict';

/*
  General requires
*/
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const util = require('util');
const path = require('path');
const morgan = require('morgan');
const errorHandling = require('./lib/errorHandler/index');
const { loadSchema } = require('./lib/payloadValidator/index');
const cors = require('cors');

/*
  Routes
*/
const api = require('./routes/api');

/* 
	Schema validation
*/
const schemaPath = path.join(__dirname, 'openapi.yaml');
loadSchema(schemaPath);


util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

const app = express();

/*
  Middleware setup
*/
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

/* 
  RESTful API - User 
*/
app.post('/api/v1.0/freelancer', api.freelancer.createFreelancer);
app.get('/api/v1.0/freelancer', api.freelancer.getFreelancer);
app.get('/api/v1.0/freelancer/:freelancerId', api.freelancer.getFreelancer);
app.put('/api/v1.0/freelancer/:freelancerId', api.freelancer.updateFreelancer);
app.delete('/api/v1.0/freelancer/:freelancerId', api.freelancer.deleteFreelancer);

/* 
  RESTful API - Skill 
*/
app.get('/api/v1.0/skill', api.skill.getSkill);

/* 
  RESTful API - Hobby 
*/
app.get('/api/v1.0/hobby', api.hobby.getHobby);


/*
  Error handling setup
*/
app.use(errorHandling.notFound);
app.use((err, req, res, next) => {
  next(err);
}, errorHandling.error);

module.exports = app;
