import { useEffect, useState } from 'react'
import { preloadAssets, getAppAssets } from './preloader'

export const usePreloader = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const loadAssets = async () => {
      const { images, videos } = getAppAssets()
      
      await preloadAssets({
        images,
        videos,
        onProgress: (loaded, total) => {
          setProgress((loaded / total) * 100)
        },
      })
      
      setIsLoading(false)
    }

    loadAssets()
  }, [])

  return { isLoading, progress }
}

