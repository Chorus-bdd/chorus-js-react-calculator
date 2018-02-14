#!/bin/bash

trap cleanup EXIT

cleanup() {
    docker-compose stop
}

echo "Starting Docker services..."
docker-compose up hub firefox chrome chorus-react-calculator > docker-services.log 2>&1 &
if [ $? -ne 0 ] ; then
  echo "Failed to start Docker services"
  exit 1
fi

docker-compose up chorus-interpreter

# We have to pick up the exit code using docker inspect
LAST_CONTAINER_ID=`docker ps -l -q`
EXIT_CODE=`docker inspect ${LAST_CONTAINER_ID} --format='{{.State.ExitCode}}'`

if [ ${EXIT_CODE} -ne 0 ] ; then
  echo "Exit code from Chorus interpreter was ${EXIT_CODE}"
  echo "Service logs:"
  cat docker-services.log
  echo "Tests Failed"
  exit 1
else
  echo "Success!"
fi
  
