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
echo "---------------------------------------------------"
echo -e "---------------------------------------------------${Color_Off}"
echo -e "${BLOD_GREEN}Downing The Oracle Connector Docker Container And Removing It's Volumes${Color_Off}"
docker compose down -v
echo -e "${GREEN}"
echo "---------------------------------------------------"
echo -e "---------------------------------------------------${Color_Off}"
echo -e "${BLOD_GREEN}Successfully Down The Oracle Connector Docker Conatainer And Removed It's Volumes${Color_Off}"

# Remove The Oracle Connector Docker Images
echo -e "${GREEN}"
echo "---------------------------------------------------"
echo -e "---------------------------------------------------${Color_Off}"
echo -e "${BLOD_GREEN}Removing Docker Image Of The Oracle Connector${Color_Off}"
docker image rm -f redis:latest obc-connector-prod:1.0.0 
echo -e "${GREEN}"
echo "---------------------------------------------------"
echo -e "---------------------------------------------------${Color_Off}"
echo -e "${BLOD_GREEN}Successfully Removed Image Of The Oracle Connector${Color_Off}"


echo ""
echo -e "${BOLD_YELLOW}Thank You!!!${Color_Off}"
echo ""
