FROM google/debian:wheezy

RUN apt-get update -y && apt-get install --no-install-recommends -y -q curl python build-essential git ca-certificates libkrb5-dev
RUN mkdir /nodejs && curl https://nodejs.org/dist/v4.1.2/node-v4.1.2-linux-x64.tar.gz | tar xvzf - -C /nodejs --strip-components=1

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 && \
    echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.0 main" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list && \
    apt-get update && apt-get install --no-install-recommends -y -q adduser mongodb-org && \
    echo "mongodb-org hold" | dpkg --set-selections && \
    echo "mongodb-org-server hold" | dpkg --set-selections && \
    echo "mongodb-org-shell hold" | dpkg --set-selections && \
    echo "mongodb-org-mongos hold" | dpkg --set-selections && \
    echo "mongodb-org-tools hold" | dpkg --set-selections

VOLUME /data/db
ENV AUTH yes
RUN service mongod start

ENV PATH $PATH:/nodejs/bin
WORKDIR /app
ADD package.json /app/
RUN npm install
#ADD . /app
ADD run.sh /
RUN npm install -g nodemon

EXPOSE 8080

ENTRYPOINT ["/run.sh"]
