import { useCallback, useState } from "react"
import { AnalyticsTrackerService } from "../../services/AnalyticsTrackerService"
import { EVENT_NAMES } from "../../services/AnalyticsTrackerService/eventNames"

export const useAsyncError = (): ((e: Error) => void) => {
  const [, setError] = useState<Error | null>(null)

  return useCallback(
    (error: Error) => {
      setError(() => {
        AnalyticsTrackerService.track(EVENT_NAMES.USE_ASYNC_ERROR, { error })
        throw error
      })
    },
    [setError]
  )
}
