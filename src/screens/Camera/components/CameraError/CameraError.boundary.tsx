import { AnalyticsTrackerService } from "@services/AnalyticsTrackerService"
import { EVENT_NAMES } from "@services/AnalyticsTrackerService/eventNames"
import { Component, ErrorInfo } from "react"
import { CameraError } from "./CameraError.component"

export class CameraErrorBoundary extends Component {
  state = { hasError: false, error: null, info: null }

  static getDerivedStateFromError(error: Error) {
    AnalyticsTrackerService.track(
      EVENT_NAMES.BOUNDARY_GET_DERIVED_STATE_FROM_ERROR,
      { error }
    )

    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    AnalyticsTrackerService.track(EVENT_NAMES.BOUNDARY_DID_CATCH, {
      error,
      info
    })

    this.setState({ error, info })
  }

  render() {
    const { hasError, error } = this.state

    if (hasError) {
      return <CameraError error={error} />
    }

    return this.props.children
  }
}
