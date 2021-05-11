FROM node:14-buster as build
RUN apt-get update \
    && apt-get install -y bash git python build-essential libusb-1.0

ADD . /opt/contracts
RUN cd /opt/contracts && yarn install && yarn build

FROM node:14-buster

RUN apt-get update \
    && apt-get install -y bash curl jq python3 libusb-1.0 \
    && mv /usr/bin/python /usr/bin/python2 \
    && ln -s $(which python3) /usr/bin/python

COPY --from=build /opt/contracts /opt/contracts
COPY wait-for-l1.sh /wait-for-l1.sh
RUN chmod +x /wait-for-l1.sh

ENV SERVER_PORT=8080
WORKDIR /opt/contracts

ENTRYPOINT ["/wait-for-l1.sh", "yarn", "run", "--silent", "deploy"]