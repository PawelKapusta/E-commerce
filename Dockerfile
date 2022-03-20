FROM ubuntu:20.04

ENV TZ=Europe/Warsaw
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone 

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get update && apt-get install -y build-essential unzip vim git curl wget zip openjdk-11-jdk && apt-get clean

RUN useradd -ms /bin/bash paul
RUN adduser paul sudo

WORKDIR /home/paul

RUN curl -sSLO https://github.com/pinterest/ktlint/releases/download/0.44.0/ktlint && chmod a+x ktlint
RUN mv /home/paul/ktlint /usr/bin/ktlint

USER paul

RUN curl -s "https://get.sdkman.io" | bash
RUN chmod a+x "$HOME/.sdkman/bin/sdkman-init.sh"
RUN source "$HOME/.sdkman/bin/sdkman-init.sh" && sdk install kotlin && sdk install gradle


EXPOSE 9000  

COPY ./ ./