import { AnalyticsTrackerService } from "@services/AnalyticsTrackerService"
import { EVENT_NAMES } from "@services/AnalyticsTrackerService/eventNames"
import { useRenderInfo } from "@uidotdev/usehooks"
import { useEffect } from "react"

export const useTrackRenderInfo = (componentName: string) => {
  const info = useRenderInfo(componentName)

  useEffect(() => {
    AnalyticsTrackerService.track(EVENT_NAMES.USE_RENDER_INFO, { info })
  }, [info])
}
