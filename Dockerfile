FROM nextstrain/base-builder:build-20210413T201712Z AS builder

LABEL maintainer "Chris Tomkins-Tinch <tomkinsc@broadinstitute.org>"

ENV HOST=0.0.0.0 PORT=4000

RUN apt-get install -qy git-lfs less

RUN mkdir -p /auspice_data/data /auspice_data/narratives

COPY . /nextstrain/auspice/

RUN cd /nextstrain/auspice && npm install && npm link && auspice build

FROM nextstrain/base:build-20210413T201712Z

ENV HOST=0.0.0.0 PORT=4000

COPY --from=builder /nextstrain/auspice/ /nextstrain/auspice/

ENTRYPOINT ["auspice", "view", "--datasetDir", "/auspice_data/data", "--narrativeDir", "/auspice_data/narratives"]
