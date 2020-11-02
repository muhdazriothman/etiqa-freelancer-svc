# Freelance API App

This is an application to manage freelancers directory.
- Express-based app
- Uses MVC folder structure
- OpenAPI as API documentation
- Payload validation is based on swagger openAPI
- MongoDB as data storage
- Hosted at Heroku

## Run the app

    npm run startlocal

# REST API

The REST API to the app is described below.

## Freelancer

- `POST /api/v1.0/freelancer` &mdash; Create freelancer
- `GET /api/v1.0/freelancer` &mdash; Get list of Freelances
- `GET /api/v1.0/freelancer/:freelancerId` &mdash; Get freelancer by id
- `PUT /api/v1.0/freelancer/:freelancerId` &mdash; Update freelancer
- `DELETE /api/v1.0/freelancer/:freelancerId` &mdash; Delete freelancer

## Skill

- `GET /api/v1.0/skill` &mdash; Get list of Skills

## Hobby

- `GET /api/v1.0/hobby` &mdash; Get list of Hobbies

# Sample Payload

For more info regarding the sample payload, please refer [openapi.yaml](https://github.com/muhdazriothman/etiqa-freelancer-svc/blob/main/app/src/openapi.yaml)
