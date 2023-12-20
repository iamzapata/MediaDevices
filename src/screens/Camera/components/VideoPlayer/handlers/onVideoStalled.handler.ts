import { SyntheticEvent } from "react"
import { AnalyticsTrackerService } from "../../../../../services/AnalyticsTrackerService"
import { EVENT_NAMES } from "../../../../../services/AnalyticsTrackerService/eventNames"

export const onVideoStalled = (
  event: SyntheticEvent<HTMLVideoElement, Event>
) => {
  AnalyticsTrackerService.track(EVENT_NAMES.VIDEO_PLAYER_STALLED, { event })
}
