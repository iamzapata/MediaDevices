import {
  requestMediaPermissions,
  MediaPermissionsErrorTypes,
  MediaPermissionsError
} from "./requestMediaPermissions"

const chromeUserAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

describe("requestMediaPermissions", () => {
  let originalUserAgent: string

  beforeEach(() => {
    // Save the original userAgent
    originalUserAgent = window.navigator.userAgent
  })

  afterEach(() => {
    // Reset userAgent to its original value
    Object.defineProperty(window.navigator, "userAgent", {
      value: originalUserAgent,
      configurable: true
    })
  })

  it("should resolve to true when getUserMedia is successful", async ({
    expect
  }) => {
    // Mock successful getUserMedia call
    console.log("window.navigator.mediaDevices", window.navigator.mediaDevices)

    const result = await requestMediaPermissions()
    expect(result).toBe(true)
  })

  describe.each([
    [
      "Chrome",
      [
        {
          userAgent: chromeUserAgent,
          name: "NotAllowedError",
          message: "Permission denied by system",
          errorCode: MediaPermissionsErrorTypes.SystemPermissionDenied
        },
        {
          userAgent: chromeUserAgent,
          name: "NotAllowedError",
          message: "Permission denied",
          errorCode: MediaPermissionsErrorTypes.UserPermissionDenied
        },
        {
          userAgent: chromeUserAgent,
          name: "NotReadableError",
          message: "Could not start video source",
          errorCode: MediaPermissionsErrorTypes.CouldNotStartVideoSource
        }
      ]
    ],
    ["Safari"],
    ["Edge"],
    ["Firefox"]
  ])("%s", (browser, errorCodes) => {
    it.each([])(
      "handles $errorCode",
      async ({ userAgent, name, message, errorCode }) => {
        Object.defineProperty(window.navigator, "userAgent", {
          value: userAgent,
          configurable: true
        })

        Object.defineProperty(window.navigator, "mediaDevices", {
          value: {
            getUserMedia: () =>
              Promise.reject({
                name,
                message
              })
          },
          writable: true
        })

        try {
          await requestMediaPermissions()
        } catch (err: unknown) {
          if (err instanceof MediaPermissionsError) {
            expect(err.type).toBe(errorCode)
            expect(err.name).toBe(name)
            expect(err.message).toBe(message)
          }
        }
      }
    )
  })
})
