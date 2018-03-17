#!/bin/bash

trap cleanup EXIT

cleanup() {
    docker-compose stop
}

echo "Starting Docker services..."
docker-compose up -d
if [ $? -ne 0 ] ; then
  echo "Failed to start Docker services"
  exit 1
fi

# Wait until the other services are reachable before running the chorus command
echo "Please wait for the containers to start up... this may take up to a minute"
echo "While developing you only need to start them once.."

DOCKERIZE="dockerize -wait tcp://chrome:5900 -wait tcp://hub:4444 -wait http://chorus-react-calculator:80 -timeout 90s"
docker-compose exec -T chorus-interpreter ${DOCKERIZE} chorus -c -f /features

if [ $? -ne 0 ] ; then
  echo "Exit code from Chorus interpreter was $?"
  echo "Service logs:"
  docker-compose logs
  echo "Tests Failed"
  exit 1
else
  echo "Success!"
fi
  
