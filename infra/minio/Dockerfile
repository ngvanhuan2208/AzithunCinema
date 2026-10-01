FROM golang:1.24.8-alpine3.22 AS build
RUN apk add --no-cache git ca-certificates
ENV CGO_ENABLED=0
RUN go install github.com/minio/minio@RELEASE.2025-10-15T17-29-55Z

FROM alpine:3.22
RUN apk add --no-cache ca-certificates curl \
    && addgroup -S -g 10001 minio \
    && adduser -S -D -u 10001 -G minio minio \
    && mkdir -p /data \
    && chown minio:minio /data
COPY --from=build /go/bin/minio /usr/local/bin/minio
USER minio
EXPOSE 9000 9001
HEALTHCHECK --interval=10s --timeout=5s --retries=5 CMD curl -f http://localhost:9000/minio/health/live || exit 1
ENTRYPOINT ["minio"]
