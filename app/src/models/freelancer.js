'use strict';

const BaseModel = require('./baseModel');

const schema = {
  create: 'createFreelancer',
  update: 'updateFreelancer'
};

class Freelancer extends BaseModel {
  constructor() {
    super();
    this.collectionName = 'Freelancers';
  }
  
  static getInstance() {
    if (!this._instance) {
      this._instance = new Freelancer();
    }
    return this._instance;
  }
  
  static getSchemaName() {
    return schema;
  }
}

module.exports = Freelancer;
