import { IS_BROWSER } from "$fresh/runtime.ts";
import { useCallback, useEffect, useState } from "preact/hooks";

interface LeaderboardEntry {
    term: string,
    rating: number
}

interface LeaderboardData {
    top: LeaderboardEntry[],
    bottom: LeaderboardEntry[],
    length: number
}

export default function Leaderboard() {
    const leaderboardRoute = `${window?.location?.origin}/api/leaderboard`
    const [leaderboardTop, setLeaderboardTop] = useState([] as LeaderboardEntry[]);
    const [leaderboardBottom, setLeaderboardBottom] = useState([] as LeaderboardEntry[]);
    const [length, setLength] = useState(0);
    const [revealed, setRevealed] = useState(false);

    const refreshLeaderboard = useCallback(async () => {
        if (IS_BROWSER) {
            const leaderboardData: LeaderboardData = await (await fetch(`${leaderboardRoute}?revealAll=${revealed}`, {
                method: "GET",
            })).json()

            setLeaderboardTop(leaderboardData.top)
            setLeaderboardBottom(leaderboardData.bottom)
            setLength(leaderboardData.length)
        }
    }, [revealed])

    useEffect(() => {
        refreshLeaderboard()

        const timerId = setInterval(refreshLeaderboard, 1000)

        return () => clearInterval(timerId)
    }, [refreshLeaderboard])
    return <div class="my-6">
        <ol class="list-decimal">
            {leaderboardTop.map((item: LeaderboardEntry) => (
                <li class="dark:text-gray-300" key={item}>{item.term}: {item.rating}</li>
            ))}
            {leaderboardBottom.length > 0 && <a onClick={() => {
                setRevealed(!revealed)
            }} class="dark:text-gray-300 font-medium">... {Math.max(length-leaderboardTop.length-leaderboardBottom.length, 0)} more</a>}
            {leaderboardBottom.map((item: LeaderboardEntry, index) => (
                <li class="dark:text-gray-300" value={(length-leaderboardBottom.length+1)+index} key={item}>{item.term}: {item.rating}</li>
            ))}
            {<a onClick={() => {
                setRevealed(!revealed)
                refreshLeaderboard()
            }} class="dark:text-gray-300 text-underline cursor-pointer">Reveal {revealed ? "less" : "more"} ...</a>}

        </ol>
    </div>
}

