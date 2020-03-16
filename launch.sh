###
# This file build and launch the docker image
###

# Extract the archive
echo "Extracting archive ..."
tar -xzf ./solidarite-covid_docker.tar.gz

# Stop the previous container
echo "Stopping and removing previous container/image ..."
sudo docker stop solidarite-covid
sudo docker rm solidarite-covid
sudo docker rmi --force solidarite-covid/server:latest

# Launch the docker image
echo "Loading and starting new image/container ..."
sudo docker load < solidarite-covid_docker.tar
sudo docker run -td --name solidarite-covid -p 1234:1234 solidarite-covid/server

echo "Reloading apache2 ..."
sudo service apache2 reload

echo "Done !"
