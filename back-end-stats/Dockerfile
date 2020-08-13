FROM rust:1-slim-buster AS base

ENV USER=root

WORKDIR /code
RUN cargo init
COPY Cargo.toml /code/Cargo.toml
RUN cargo fetch

COPY src /code/src

CMD [ "cargo", "test", "--offline" ]

FROM base AS builder

RUN cargo build --release --offline

FROM rust:1-slim-buster

COPY --from=builder /code/target/release/back-end-stats /usr/bin/back-end-stats

EXPOSE 8080

ENTRYPOINT [ "/usr/bin/back-end-stats" ]