// Image optimization utilities for FOKINA

export const imageOptimizationConfig = {
  // Supported image formats in order of preference
  formats: ['image/webp', 'image/avif', 'image/jpeg'],
  
  // Image quality settings
  quality: {
    high: 90,
    medium: 80,
    low: 70,
  },
  
  // Responsive image sizes
  sizes: {
    thumbnail: 150,
    small: 300,
    medium: 600,
    large: 1200,
    xlarge: 1920,
  },
  
  // Lazy loading configuration
  lazyLoading: {
    enabled: true,
    threshold: '100px',
  },
}

export function getImageSrcSet(imagePath: string): string {
  const basePath = imagePath.replace(/\.[^.]+$/, '')
  const sizes = Object.values(imageOptimizationConfig.sizes)
  
  return sizes
    .map((size) => `${basePath}-${size}w.webp ${size}w`)
    .join(', ')
}

export function getImageSizes(): string {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
}
