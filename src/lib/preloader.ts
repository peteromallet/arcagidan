/**
 * Preloader utility for images and videos
 * Loads images first, then videos in priority order
 */

interface PreloadOptions {
  images: string[]
  videos: { url: string; priority: number }[]
  onProgress?: (loaded: number, total: number) => void
}

/**
 * Preload an image
 */
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

/**
 * Preload a video (metadata only for faster initial load)
 */
const preloadVideo = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.onloadedmetadata = () => resolve()
    video.onerror = () => reject(new Error(`Failed to load video: ${src}`))
    video.src = src
  })
}

/**
 * Main preloader function
 * Loads all images first, then videos in priority order
 */
export const preloadAssets = async ({ images, videos, onProgress }: PreloadOptions): Promise<void> => {
  const total = images.length + videos.length
  let loaded = 0

  const updateProgress = () => {
    loaded++
    onProgress?.(loaded, total)
  }

  // Step 1: Load all images in parallel
  console.log('Preloading images...')
  await Promise.all(
    images.map(async (src) => {
      try {
        await preloadImage(src)
        updateProgress()
      } catch (error) {
        console.warn(`Failed to preload image: ${src}`, error)
        updateProgress()
      }
    })
  )

  // Step 2: Sort videos by priority (higher priority first)
  const sortedVideos = [...videos].sort((a, b) => b.priority - a.priority)

  // Step 3: Load videos sequentially in priority order
  console.log('Preloading videos...')
  for (const video of sortedVideos) {
    try {
      await preloadVideo(video.url)
      updateProgress()
    } catch (error) {
      console.warn(`Failed to preload video: ${video.url}`, error)
      updateProgress()
    }
  }

  console.log('All assets preloaded!')
}

/**
 * Get all asset URLs from the app
 */
export const getAppAssets = () => {
  const images = [
    '/logo.png',
    '/10217-poster.jpg',
    '/10219-poster.jpg',
    '/102110-poster.jpg',
    '/102111-poster.jpg',
    '/way-i-see-it-poster.jpg',
    '/fernweh-poster.jpg',
    '/2085-poster.jpg',
  ]

  const videos = [
    // Hero videos (higher priority)
    { url: '/10217.mp4', priority: 4 },
    { url: '/10219.mp4', priority: 3 },
    { url: '/102110.mp4', priority: 2 },
    { url: '/102111.mp4', priority: 1 },
    // Theme videos (lower priority)
    { url: '/way-i-see-it.mp4', priority: 0 },
    { url: '/fernweh.mp4', priority: 0 },
    { url: '/2085.mp4', priority: 0 },
  ]

  return { images, videos }
}

