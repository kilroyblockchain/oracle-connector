#!/bin/bash
RED='\033[0;31m'
BLOD_RED='\033[1;31m'
GREEN='\033[0;32m'
BLOD_GREEN='\033[1;32m'
YELLOW="\033[0;33m"
Color_Off='\033[0m'

# Export oracle connector repo name
export ORACLE_CONNECTOR_REPO=oracle-connector

#  Check the if the setup or created .env file or not or is empty or not
if [[ ! -f ".env" ||  ! -s ".env" ]];
then 
echo -e "${RED}"
echo -e "------------------------------------------------------------------------------------------------------"
echo -e "------------------------------------------------------------------------------------------------------"
echo -e ".env file not found"
echo -e "Please set up .env file on the root folder of oracle-connector."
echo -e "For sample .env file you can see the .env-sample file at the root folder of the oracle-connector."
echo -e "------------------------------------------------------------------------------------------------------"
echo -e "------------------------------------------------------------------------------------------------------"
echo -e "${Color_Off}"
echo -e ""
exit 0 
fi

# Run oracle connector docker container
echo -e "${GREEN}"
echo "-------------------------------------------------------------"
echo "-------------------------------------------------------------"
echo -e "Starting docker container for oracle-connector"
echo "-------------------------------------------------------------"
echo -e "-------------------------------------------------------------${Color_Off}"
docker compose up -d prod

echo -e "${GREEN}"
echo "-------------------------------------------------------------"
echo -e "-------------------------------------------------------------"
echo -e "Successfully started oracle-connector on docker container"
echo -e "-------------------------------------------------------------"
echo -e "-------------------------------------------------------------${Color_Off}"