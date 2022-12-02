#!/bin/bash
GREEN='\033[0;32m'
BLOD_GREEN='\033[1;32m'
BOLD_YELLOW="\033[1;33m"
RED='\033[0;31m'
BLOD_RED='\033[1;31m'
Color_Off='\033[0m'

# Export oracle connector repo name
export ORACLE_CONNECTOR_REPO=./oracle-connector

# Down The Oracle Connector Docker Container And Remove It's Volumes
echo -e "${GREEN}"
echo -e "-------------------------------------------------------------------"
echo -e "-------------------------------------------------------------------"
echo -e "Stopping and removing oracle-connector docker container."
echo -e "-------------------------------------------------------------------"
echo -e "-------------------------------------------------------------------${Color_Off}"
docker compose down -v
docker image rm -f redis:latest obc-connector-prod:1.0.0 
rm .env
echo -e "${GREEN}"
echo -e "-------------------------------------------------------------------"
echo -e "-------------------------------------------------------------------"
echo -e "Successfully stopped and removed oracle-connector docker container."
echo -e "-------------------------------------------------------------------"
echo -e "-------------------------------------------------------------------${Color_Off}"