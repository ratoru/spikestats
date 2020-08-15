FROM rust
WORKDIR /usr/src/app
RUN USER=root cargo init
COPY Cargo.toml Cargo.lock diesel.toml .env ./
RUN cargo build
RUN cargo install diesel_cli
COPY src ./src
COPY migrations ./migrations
COPY target ./target
EXPOSE 8080
RUN cargo build
CMD ["systemfd", "--no-pid", "-s", "http:8080", "--", "cargo", "watch", "-x", "run"]