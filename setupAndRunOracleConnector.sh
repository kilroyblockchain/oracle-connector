#!/bin/bash
RED='\033[0;31m'
BLOD_RED='\033[1;31m'
GREEN='\033[0;32m'
BLOD_GREEN='\033[1;32m'
YELLOW="\033[0;33m"
Color_Off='\033[0m'
BLUE='\033[0;34m'

. ./.env

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

# _______________________________________ Starting docker container _______________________________________
docker compose up -d prod
echo -e "${YELLOW}Starting removing docker danling images${Color_Off}"

REMOVE_DANGLING_IMAGES="docker rmi $(docker images -q -f dangling=true)"
eval $REMOVE_DANGLING_IMAGES
echo -e "${YELLOW}Successfully removed docker danling images${Color_Off}"

res=$?
{ set +x; } 2>/dev/null
if [ $res -ne 0 ]; then
    echo -e "${RED}"
    echo "-------------------------------------------------------------"
    echo "-------------------------------------------------------------"
    echo "Failed to start oracle connector"
    echo "-------------------------------------------------------------"
    echo -e "-------------------------------------------------------------${Color_Off}"
    exit 1
fi

# _______________________________________ Checking Connection and Config Error _______________________________________
echo
echo -e "${BLUE}Starting oracle connector. Please wait...${Color_Off}"
sleep 10
configError=$(docker logs oc_connector 2>&1 | grep "ERROR" | awk '{ s = ""; for (i = 10; i <= NF; i++) s = s $i " "; print s }')
connectionError=$(echo >/dev/tcp/localhost/$PORT &>/dev/null && echo "false" || echo "true")
if [[ -n $configError ]] || [ "$connectionError" == "true" ]; then
    echo -e "${RED}"
    echo "-------------------------------------------------------------"
    echo "-------------------------------------------------------------"
    echo -e "Failed to start oracle connector. See the log using the following command: ${BLUE}docker logs oc_connector"
    echo -e "${RED}-------------------------------------------------------------"
    echo -e "-------------------------------------------------------------${Color_Off}"
    exit 1
  fi

# _______________________________________ Success Connection to Oracle Cloud _______________________________________
echo -e "${GREEN}"
echo "-------------------------------------------------------------"
echo "-------------------------------------------------------------"
echo -e "Successfully started oracle-connector"
echo "-------------------------------------------------------------"
echo -e "-------------------------------------------------------------${Color_Off}"
