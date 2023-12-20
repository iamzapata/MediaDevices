import { AnalyticsEvent, AnalyticsEventPayload } from "./types"
import { AnalyticsEventName, EVENT_NAMES } from "./eventNames"
import { ApplicationLoggerService } from "../AppliationLoggerService"
import { API } from "../../api"
import { keyMirror } from "../../lib/keyMirror"

const TrackingFailedReason = keyMirror({
  ERROR: null
})

let eventIDCounter = 0
let previousEventTimestamp: Date | undefined
const eventQueue: Set<AnalyticsEvent> = new Set()

function diffInMilliseconds(end: Date | undefined, start: Date): number {
  if (end === undefined) {
    return 0
  }

  const endTimestamp = end.getTime()
  const startTimestamp = start.getTime()

  return startTimestamp - endTimestamp
}

const AnalyticsTrackerService = {
  logEvent(event: Event) {
    ApplicationLoggerService.logEvent(event)
  },

  onUnhandledRejectionHandler(error: Error) {
    this.track(EVENT_NAMES.UNHANDLED_PROMISE_REJECTION, {
      message: error.message,
      stack: error.stack
    })

    this.flushEvents()
  },

  onGlobalErrorHandler(error: Error) {
    this.track(EVENT_NAMES.UNHANDLED_ERROR, {
      message: error.message,
      stack: error.stack
    })

    this.flushEvents()
  },

  onVisibilityChangeHandler() {
    if (document.visibilityState === "hidden") {
      this.flushEvents()

      document.removeEventListener(
        "visibilitychange",
        this.onVisibilityChangeHandler
      )
    }
  },

  flushEvents(trackingFailedReason?: keyof typeof TrackingFailedReason) {
    if (eventQueue.size === 0) {
      return
    }

    function clearTracking() {
      API.postAnalyticsEvents(Array.from(eventQueue))
      eventQueue.clear()
    }

    if (trackingFailedReason === TrackingFailedReason.ERROR) {
      clearTracking()
    } else {
      this.track(EVENT_NAMES.EVENT_QUEUE_FLUSHED)
      clearTracking()
    }
  },

  registerHandlers() {
    window.addEventListener("error", () => this.onGlobalErrorHandler.bind(this))
    window.addEventListener("unhandledrejection", () =>
      this.onGlobalErrorHandler.bind(this)
    )
    window.addEventListener(
      "visibilitychange",
      this.onVisibilityChangeHandler.bind(this)
    )
  },

  track(name: AnalyticsEventName, payload?: AnalyticsEventPayload) {
    try {
      const timestamp = new Date()
      const id = eventIDCounter++
      const { screenName } = payload || {}
      const duration = diffInMilliseconds(previousEventTimestamp, timestamp)
      previousEventTimestamp = timestamp

      const event: AnalyticsEvent = {
        id,
        name,
        duration,
        timestamp,
        payload
      }

      if (screenName) {
        event.screenName = screenName
      }

      eventQueue.add(event)

      ApplicationLoggerService.logEvent(event)
    } catch (error) {
      console.error(error)
      // log with Sentry
      this.flushEvents(TrackingFailedReason.ERROR)
    }
  }
}

AnalyticsTrackerService.registerHandlers()

export { AnalyticsTrackerService }
