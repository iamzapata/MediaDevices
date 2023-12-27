import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
import {
  CameraScreenSlice,
  createCameraScreenSlice
} from "../screens/Camera/store"

export const useGlobalStore = create<CameraScreenSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createCameraScreenSlice(...a)
      }),
      {
        name: "camera-playgrond-store",
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)
