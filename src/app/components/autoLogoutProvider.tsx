"use client"
import { signOut, useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"

function AutoLogoutProvider({
    children
}: {
    children: React.ReactNode
}) {

    const [lastActivity, setLastActivity] = useState<number>(new Date().getTime())
    const { data: session, status, update } = useSession()
    const ACTIVE_KEY = "IEHiIiuIUgigIiGiGIugiUIuhIihUIGiGI"
    const {
        interval,
        activeTime,
        intervalToken
    } = {
        interval: 10 * 1000, // 10 DETIK
        activeTime: 30 * 60 * 1000, // 30 MENIT
        intervalToken: 1 * 60 * 60 * 1000 // 1 JAM
    }
    const eventListenerProps = [
        "click",
        "scroll",
        "focus",
        "mousemove"
    ]
    const now = new Date().getTime()


    const recentActive = () => {
        if (typeof window === "undefined")
            return
        const getActive = localStorage.getItem(ACTIVE_KEY)
        if (getActive) {
            return parseInt(getActive)
        } else {
            return false
        }
    }

    const updateSession = useCallback(() => {

        if (status === "unauthenticated")
            return

        if (typeof window === "undefined")
            return
        
        setTimeout(() => {
            localStorage.setItem(ACTIVE_KEY, now.toString())
            setLastActivity(now)
        }, 1000)

        const intervalSession = window.setInterval(() => {
            update().then()
        }, intervalToken)

        return () => {
            window.clearInterval(intervalSession)
        }

    }, [lastActivity])

    const isUnActiveUser = useCallback(() => {

        if (status === "unauthenticated") 
            return

        if (session?.expires! < now) {
            localStorage.removeItem(ACTIVE_KEY)
            signOut().then()
        }

        if (status === "authenticated" && lastActivity + activeTime < now) {
            localStorage.removeItem(ACTIVE_KEY)
            signOut()
        }
        
    }, [status, lastActivity])

    const getSession = useCallback(() => {

        const getActive = localStorage.getItem(ACTIVE_KEY)

        if (getActive === null || isNaN(+getActive)) {
            return
        }

        setLastActivity(+getActive)
    }, [])

    useEffect(() => {
        getSession()
    }, [lastActivity, session, isUnActiveUser])

    useEffect(() => {

        if (status === "loading") {
            return
        }

        if (status !== "authenticated") {
            return
        }

        if (typeof window === undefined)
            return

        eventListenerProps.forEach(event => {
            window.addEventListener(event, updateSession)
        })

        const intervalId = window.setInterval(isUnActiveUser, interval)

        return () => {
            window.clearInterval(intervalId)

            eventListenerProps.forEach(event => {
                window.removeEventListener(event, updateSession)
            })
        }

    }, [lastActivity, updateSession, isUnActiveUser, updateSession])

    useEffect(() => {

        if (recentActive() && lastActivity + activeTime < now) {

            localStorage.removeItem(ACTIVE_KEY)
            signOut().then()
        }
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default AutoLogoutProvider
