# Build
echo "Building ..."
sudo docker build -t "solidarite-covid/server:latest" .

# Saving to file
echo "Saving to file system ..."
sudo docker save "solidarite-covid/server:latest" > solidarite-covid_docker.tar
tar -czvf solidarite-covid_docker.tar.gz solidarite-covid_docker.tar

echo "Done !"
