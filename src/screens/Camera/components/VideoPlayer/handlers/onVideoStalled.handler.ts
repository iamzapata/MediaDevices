import { AnalyticsTrackerService } from "@services/AnalyticsTrackerService"
import { EVENT_NAMES } from "@services/AnalyticsTrackerService/eventNames"
import { SyntheticEvent } from "react"

export const onVideoStalled = (
  event: SyntheticEvent<HTMLVideoElement, Event>
) => {
  AnalyticsTrackerService.track(EVENT_NAMES.VIDEO_PLAYER_STALLED, { event })
}
