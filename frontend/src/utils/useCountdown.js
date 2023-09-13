import { useState, useEffect } from 'react'

export default function useCountdown() {
    const [secondsLeft, setSecondsLeft] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setSecondsLeft(secondsLeft - 1)
        }, 1000)
        return () => clearTimeout(timer)
    }, [secondsLeft])

    function start(seconds) {
        setSecondsLeft(seconds)
    }

    return [secondsLeft, start]
}