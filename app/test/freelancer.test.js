const tap = require('tap');
const req = require('supertest');
const app = require('../src/index');

tap.runOnly = false;

tap.pass('Test file can be executed');

let freelancerId;
const freelancerReqBody = {
  name: 'Azri',
  email: 'aa@aa.com',
  phoneNo: 'gameAssignmentTest',
  skills: [
    'skill1',
    'skill2'
  ],
  hobbies: [
    'hobby1',
    'hobby2'
  ]
};

tap.test(`Test freelancer creation`, async assert => {
  /* arrange initial state */
  let freelancerResBody;
  await req(app)
    .post(`/api/v1.0/freelancer`)
    .send(freelancerReqBody)
    .expect(201)
    .then(res => {
      freelancerId = res.body._id;
      freelancerResBody = { ...res.body };
    });

  /* act and assert */
  assert.ok(freelancerResBody);
  assert.equal(freelancerResBody.name, freelancerReqBody.name);
  assert.equal(freelancerResBody.email.toUpperCase(), freelancerReqBody.email.toUpperCase());
  assert.equal(freelancerResBody.phoneNo, freelancerReqBody.phoneNo);
  assert.equal(freelancerResBody.skills.length, freelancerReqBody.skills.length);
  assert.equal(freelancerResBody.hobbies.length, freelancerReqBody.hobbies.length);
  
  /* tear-down */
  assert.end();
});

tap.test(`Test freelancer retrieval by id`, async assert => {
  /* arrange initial state */  
  let freelancerResBody;
  await req(app)
    .get(`/api/v1.0/freelancer/${freelancerId}`)
    .expect(200)
    .then(res => {
      freelancerResBody = { ...res.body };
    });

  /* act and assert */
  assert.ok(freelancerResBody);
  assert.equal(freelancerResBody.name, freelancerReqBody.name);
  assert.equal(freelancerResBody.email.toUpperCase(), freelancerReqBody.email.toUpperCase());
  assert.equal(freelancerResBody.phoneNo, freelancerReqBody.phoneNo);
  assert.equal(freelancerResBody.skills.length, freelancerReqBody.skills.length);
  assert.equal(freelancerResBody.hobbies.length, freelancerReqBody.hobbies.length);
  
  /* tear-down */
  assert.end();
});
  

tap.test(`Test all freelancer retrieval`, async assert => {
  /* arrange initial state */
  let freelancers = [];

  await req(app)
    .get(`/api/v1.0/freelancer`)
    .then(res => {
      freelancers = [...res.body];
    });
  
  /* act and assert */
  assert.ok(freelancers);
  assert.notEqual(freelancers.length, 0);

  /* tear-down */
  assert.end();
});

tap.test(`Test freelancer deletion`, async assert => {
  /* arrange initial state */
  await req(app)
    .delete(`/api/v1.0/freelancer/${freelancerId}`)
    .expect(200);

  /* tear-down */
  assert.end();
});