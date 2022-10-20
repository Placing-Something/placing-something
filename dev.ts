#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";

Deno.env.set("REDISHOST", "127.0.0.1")
Deno.env.set("REDISPORT", "6379")

await dev(import.meta.url, "./main.ts");
