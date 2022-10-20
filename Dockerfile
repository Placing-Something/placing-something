FROM denoland/deno:alpine-1.26.1

EXPOSE 8080
WORKDIR /app

COPY . .

RUN deno cache main.ts --reload --unstable --import-map=import_map.json

CMD ["run", "--allow-all", "main.ts"]