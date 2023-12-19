import { SyntheticEvent } from "react"
import { AnalyticsTrackerService } from "../../../../../services/AnalyticsTracker"
import { EVENT_NAMES } from "../../../../../services/AnalyticsTracker/eventNames"

export const onVideoErrorHandler = (
  event: SyntheticEvent<HTMLVideoElement, Event>
) => {
  AnalyticsTrackerService.track(EVENT_NAMES.VIDEO_PLAYER_ERROR, { event })
}
