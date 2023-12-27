import { AnalyticsTrackerService } from "../AnalyticsTrackerService"
import { EVENT_NAMES } from "../AnalyticsTrackerService/eventNames"

export const SentryService = {
  captureException: (error: Error) => {
    AnalyticsTrackerService.track(EVENT_NAMES.SENTRY_CAPTURE_EXCEPTION, {
      error
    })
  },
  captureMessage: () => {},
  init: () => {},
  setUserContext: () => {}
}
