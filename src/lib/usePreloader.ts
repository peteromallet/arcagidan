import { useEffect, useState } from 'react'
import { preloadAssets, getAppAssets } from './preloader'

const MAX_LOAD_TIME = 5000 // 5 seconds max

export const usePreloader = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let imagesLoaded = false

    const loadAssets = async () => {
      const { images, videos } = getAppAssets()
      
      await preloadAssets({
        images,
        videos,
        onProgress: (loaded, total) => {
          setProgress((loaded / total) * 100)
        },
        onImagesLoaded: () => {
          imagesLoaded = true
          // Start timeout once images are loaded
          timeoutId = setTimeout(() => {
            if (imagesLoaded) {
              console.log('Max load time reached, proceeding...')
              setIsLoading(false)
            }
          }, MAX_LOAD_TIME)
        },
      })
      
      // Clear timeout if everything loaded before timeout
      clearTimeout(timeoutId)
      setIsLoading(false)
    }

    loadAssets()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return { isLoading, progress }
}

