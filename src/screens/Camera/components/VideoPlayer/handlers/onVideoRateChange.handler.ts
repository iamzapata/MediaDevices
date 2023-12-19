import { SyntheticEvent } from "react"
import { AnalyticsTrackerService } from "../../../../../services/AnalyticsTracker"
import { EVENT_NAMES } from "../../../../../services/AnalyticsTracker/eventNames"

export const onVideoRateChange = (
  event: SyntheticEvent<HTMLVideoElement, Event>
) => {
  AnalyticsTrackerService.track(EVENT_NAMES.VIDEO_PLAYER_RATEC_HANGE, { event })
}
