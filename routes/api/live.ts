import { Handlers } from "$fresh/server.ts";
// import { subscriptionClient } from "@/communication/redis.ts";

export const handler: Handlers = {
    // async GET(_req, _ctx) {
    //     const sub = await subscriptionClient.subscribe("leaderboardChanged");

    //     const body = new ReadableStream({
    //       start(controller) {
    //         setTimeout(async () => {
    //           try {
    //             for await (const x of sub.receive()) {
    //               controller.enqueue("event: message\n");
    //               controller.enqueue("data: example\n\n");
    //             }
    //           } catch {
    //             sub.close()
    //           }
    //         }, 500)
    //       },
    //       cancel() {
    //         sub.close()
    //       },
    //     });
    
    //     return new Response(body.pipeThrough(new TextEncoderStream()), {
    //       headers: {
    //         "Content-Type": "text/event-stream;charset=utf-8",
    //         "Connection": "keep-alive",
    //         "Cache-Control": "no-cache"
    //       },
    //     }); 
    // }
}