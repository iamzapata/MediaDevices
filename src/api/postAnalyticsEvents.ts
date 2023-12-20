import { AnalyticsEvent } from "../services/AnalyticsTrackerService/types"

export function postAnalyticsEvents(events: AnalyticsEvent[]) {
  try {
    const body = JSON.stringify(events)

    fetch("/analytics", {
      method: "POST",
      body,
      keepalive: true,
      headers: {
        "Content-Type": "application/json"
      }
    })
  } catch (error) {
    // call Sentry
    console.error(error)
  }
}
