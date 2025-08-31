FROM --platform=amd64 ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y xinetd gdb
RUN adduser --no-create-home --disabled-password --gecos "" vending
WORKDIR /vending
COPY vending .
COPY xinetd.conf /etc/xinetd.d/vending
CMD ["/usr/sbin/xinetd", "-dontfork"]
