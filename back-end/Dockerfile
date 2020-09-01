FROM rust as build
ENV PKG_CONFIG_ALLOW_CROSS=1

WORKDIR /usr/src/back-end
COPY . .

RUN cargo install --path .

FROM gcr.io/distroless/cc-debian10

COPY --from=build /usr/local/cargo/bin/back-end /usr/local/bin/back-end

EXPOSE 8080

CMD ["back-end"]
