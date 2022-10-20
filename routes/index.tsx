import { Head, IS_BROWSER } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Questionnaire from "../islands/Questionnaire.tsx";
import Leaderboard from "../islands/Leaderboard.tsx";
import redis from "../communication/redis.ts";

interface Data {
  question: string;
}

export const handler: Handlers<Data | null> = {
  async GET(_, ctx) {
    const question = await redis.get("question") as string
    return ctx.render({ question })
  },
};

export default function Home({ data }: PageProps<Data | null>) {
  return (
    <body class="dark:bg-gray-900">
      <Head>
        <title>Placing Something</title>
      </Head>
      <div class="py-4 mx-auto max-w-screen-sm px-8">
        <div class="flex items-center">
          <img
            src="/logo.svg"
            width={40}
            height={40}
            alt="placing something logo"
          />
          <h1 class="text-xl ml-2 font-bold dark:text-white">
            Placing Something
          </h1>
        </div>
        <h1 class="mb-2 dark:text-gray-300">{data?.question || "Which do you prefer?"}</h1>
        <Questionnaire />
        <Leaderboard />
        <p class="mt-1 mb-1 dark:text-gray-600 text-gray-500">Copyright © {new Date().getFullYear()} Placing Something. All rights reserved.</p>
        <a class="mt-1 mb-2 dark:text-gray-500 text-gray-600" href="https://github.com/placing-something/placing-something">View Source</a>
      </div>
    </body>
  );
}
