import { AnalyticsEventName } from "./eventNames"

export type AnalyticsEventPayload = Record<string, unknown> & {
  screenName?: string
}

export interface AnalyticsEvent {
  name: AnalyticsEventName
  id: number
  timestamp: Date
  duration: number
  payload?: AnalyticsEventPayload
  screenName?: string
}
