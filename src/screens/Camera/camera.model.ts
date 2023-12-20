import { useState } from "react"
import { UserMediaService } from "../../services/UserMediaService"

export const useCameraModel = () => {
  const [isStreamLoading, setIsStreamLoading] = useState<boolean>(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const getStream = async () => {
    setIsStreamLoading(true)

    try {
      const stream = await UserMediaService.getStream({
        video: true,
        audio: true
      })

      setIsStreamLoading(false)

      if (!stream) {
        // Depending on the product requirements,
        // we may want to throw an error or emit an event in order to adapt
        // the UI to the current state of the application.
        throw new Error("Stream not found")
      }

      setStream(stream)
    } catch (error) {
      setIsStreamLoading(false)

      if (error instanceof Error) {
        setError(error)
      }

      console.error(error)

      // call Sentry or other error tracking service
    }
  }

  const stopStream = () => {
    if (stream) {
      UserMediaService.stopStream(stream)
      setStream(null)
    }
  }

  return {
    stream,
    error,
    isStreamLoading,
    getStream,
    stopStream
  }
}
