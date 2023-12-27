import { useState, useCallback } from "react"
import { UserMediaService } from "../../services/UserMediaService"
import { ApplicationLoggerService } from "../../services/AppliationLoggerService"
import { useAsyncError } from "../../hooks/useAsyncError"

export class NoStreamError extends Error {
  constructor(stream: unknown) {
    super(`Stream is not valid: ${stream}`)
    this.name = "NoStreamError"
  }
}

interface CameraModelParams {
  constraints: MediaStreamConstraints
}
export const useCameraModel = ({ constraints }: CameraModelParams) => {
  const throwAsyncError = useAsyncError()

  const [isStreamLoading, setIsStreamLoading] = useState<boolean>(false)
  const [stream, setStream] = useState<MediaStream | null>(null)

  const getStream = useCallback(async () => {
    setIsStreamLoading(true)

    try {
      const stream = await UserMediaService.getStream(constraints)

      setIsStreamLoading(false)

      if (!stream) {
        throw new NoStreamError(stream)
      }

      setStream(stream)
    } catch (error) {
      setIsStreamLoading(false)

      if (error instanceof Error) {
        ApplicationLoggerService.logError(error)
      }

      throwAsyncError(error as Error)
    }
  }, [constraints, throwAsyncError])

  const stopStream = useCallback(() => {
    if (stream) {
      UserMediaService.stopStream(stream)
      setStream(null)
    }
  }, [stream])

  return {
    stream,
    isStreamLoading,
    getStream,
    stopStream
  }
}
