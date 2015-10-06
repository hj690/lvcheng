# lvcheng

Run:
```
npm install --save
DEBUG=lvcheng npm start
```


## Setup dev env on OS X
1. Install https://www.docker.com/toolbox
2. Run *Docker Quickstart Terminal*. You will see your *default* IP in terminal.
3. Build image and run container
 ```shell
 docker build -t lvcheng .
 docker run -p 27017:27017 -p 28017:28017 -p 8080:8080 lvcheng
 ```

4. Browse the web from *default* IP with port 8080

### Random note
1. Run mongodb server:
```
docker run -d -p 27017:27017 -p 28017:28017 -e AUTH=no tutum/mongodb
```
2. Update the IP in [app.js](app.js) to be your *default* IP
