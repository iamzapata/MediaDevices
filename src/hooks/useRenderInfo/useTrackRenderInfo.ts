import { useRenderInfo } from "@uidotdev/usehooks"
import { useEffect } from "react"
import { AnalyticsTrackerService } from "../../services/AnalyticsTracker"
import { EVENT_NAMES } from "../../services/AnalyticsTracker/eventNames"

export const useTrackRenderInfo = (componentName: string) => {
  const info = useRenderInfo(componentName)

  useEffect(() => {
    AnalyticsTrackerService.track(EVENT_NAMES.USE_RENDER_INFO, { info })
  }, [info])
}
