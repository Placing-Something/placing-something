import { connect } from "https://deno.land/x/redis@v0.27.1/mod.ts";

export default await connect({
  hostname: Deno.env.get("REDISHOST")!,
  username: Deno.env.get("REDISUSER"),
  password: Deno.env.get("REDISPASSWORD"),
  port: Deno.env.get("REDISPORT")
});
