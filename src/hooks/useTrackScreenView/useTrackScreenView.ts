import {
  AnalyticsEventPayload,
  AnalyticsTrackerService
} from "@services/AnalyticsTrackerService"
import { EVENT_NAMES } from "@services/AnalyticsTrackerService/eventNames"
import { useIsFirstRender } from "@uidotdev/usehooks"
import { useEffect } from "react"

export const useTrackScreenView = (
  screenName: AnalyticsEventPayload["screenName"]
) => {
  const isNotFirstRender = !useIsFirstRender()

  useEffect(() => {
    if (isNotFirstRender) {
      return
    }

    const eventName = EVENT_NAMES.SCREEN_RENDERED
    const payload = { screenName }

    AnalyticsTrackerService.track(eventName, payload)
  }, [isNotFirstRender, screenName])
}
