# Celtra Assignment

## Setup

**NOTE:** Build is done with Docker so make sure you have it installed on local computer

## Running the app

Simply run docker command:
`docker-compose up --build`

To stop the app run:
`docker-compose down`

The command will do the following:

1. Pull and start MongoDB
2. Pull and start Redis
3. Build and start lottery backend service on port 8081 (NOTE: at each start Mongo data is droped)
4. Start lottery web app using nginx on port 8080
5. Start animation web app using nginx on port 8082
6. Start widget service

## Assignment result

To view assignment navigate to http://localhost:8080

## Bonus assignment

To view bonus assignment navigate to http://localhost:8082
