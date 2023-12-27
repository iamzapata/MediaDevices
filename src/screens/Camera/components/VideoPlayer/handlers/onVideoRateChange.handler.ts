import { AnalyticsTrackerService } from "@services/AnalyticsTrackerService"
import { EVENT_NAMES } from "@services/AnalyticsTrackerService/eventNames"
import { SyntheticEvent } from "react"

export const onVideoRateChange = (
  event: SyntheticEvent<HTMLVideoElement, Event>
) => {
  AnalyticsTrackerService.track(EVENT_NAMES.VIDEO_PLAYER_RATEC_HANGE, { event })
}
