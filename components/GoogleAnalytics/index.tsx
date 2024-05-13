"use client"

import { useEffect } from "react"
import { install, gtag, initDataLayer } from "ga-gtag"

type AnalyticsProps = {
  consent: string | undefined
}
function GoogleAnalytics({ consent }: AnalyticsProps) {

  useEffect(() => {
    initDataLayer()
    gtag("consent", "default", {
      analytics_storage: consent ? consent : "denied",
    })
    install(`${process.env.GTAG_ID}`)
  }, [consent])
  return <></>
}

export default GoogleAnalytics
