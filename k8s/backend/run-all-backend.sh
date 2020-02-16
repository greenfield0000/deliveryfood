#!/bin/sh

#deploy

for f in **/deploy.sh; do 
   result=$(echo "$f" | sed "s/\/deploy.sh//g")
   cd $result
   sh *.sh
   cd -
done
