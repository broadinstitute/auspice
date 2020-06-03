FROM nextstrain/base:build-20200506T095107Z

LABEL maintainer "Chris Tomkins-Tinch <tomkinsc@broadinstitute.org>"

ENV HOST=0.0.0.0 PORT=4000

RUN mkdir -p /auspice_data/data /auspice_data/narratives

COPY . /nextstrain/auspice/

RUN cd /nextstrain/auspice && npm link && auspice build

ENTRYPOINT ["auspice", "view", "--datasetDir", "/auspice_data/data", "--narrativeDir", "/auspice_data/narratives"]
