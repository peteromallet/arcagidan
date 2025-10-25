/**
 * Preloader utility for images and videos
 * Loads images first, then videos in priority order
 */

interface PreloadOptions {
  images: string[]
  videos: { url: string; priority: number }[]
  onProgress?: (loaded: number, total: number) => void
  onImagesLoaded?: () => void
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
 * Preload a video (load enough data for smooth playback start)
 */
const preloadVideo = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'auto'
    video.muted = true
    video.playsInline = true
    // Wait for enough data to be loaded to start playback smoothly
    video.oncanplay = () => resolve()
    video.onerror = () => reject(new Error(`Failed to load video: ${src}`))
    video.src = src
    // Load the video
    video.load()
  })
}

/**
 * Main preloader function
 * Loads all images first, then videos in priority order
 */
export const preloadAssets = async ({ images, videos, onProgress, onImagesLoaded }: PreloadOptions): Promise<void> => {
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
  
  // Notify that images are loaded
  console.log('Images loaded!')
  onImagesLoaded?.()

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
    // Hero videos load during preload (high priority)
    { url: '/10217.mp4', priority: 4 },
    { url: '/10219.mp4', priority: 3 },
    { url: '/102110.mp4', priority: 2 },
    { url: '/102111.mp4', priority: 1 },
    // Theme videos will load in background after page loads
  ]

  return { images, videos }
}

