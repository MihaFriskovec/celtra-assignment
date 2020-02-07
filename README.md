# Celtra Assignment

## Setup

**NOTE:** Build is done with Docker so make sure you have it installed on local computer

## Running the app

Simply run docker command:
`docker-compose up`

The command will do the following:

1. Pull and start MongoDB
2. Build and start lottery backend service on port 8081
3. Start lottery web app using nginx on port 8080
4. Start animation web app using nginx on port 8082
