import { AnalyticsEvent } from "../AnalyticsTrackerService/types"

const ApplicationLoggerService = {
  logEvent: (event: AnalyticsEvent) => {
    console.groupCollapsed(
      `%c${event.name}`,
      "color: #9E9E9E; font-weight: lighter"
    )

    if (event.payload) {
      console.table(event.payload)
    }

    console.groupEnd()
  }
}

export { ApplicationLoggerService }
