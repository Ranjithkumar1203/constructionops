FROM node:14.20

RUN apt update -y && \
    apt install ng-common -y

WORKDIR /opt 

ENV PATH /opt/node_modules/.bin:$PATH

COPY package.json /opt/package.json

RUN npm install && \
    npm install -g @angular/cli && \
    npm install rxjs && \
    npm install rxjs-compat

COPY . /opt/

CMD ng serve --host 0.0.0.0
