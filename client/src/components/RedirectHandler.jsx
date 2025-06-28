import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getShortenedUrls, getClickStats, storeClickStats } from '../utils/api'

const RedirectHandler = () => {
  const { shortcode } = useParams()

  useEffect(() => {
    const urls = getShortenedUrls()
    const match = urls.find(u => u.shortcode === shortcode)

    if (match) {
      const newClick = {
        shortcode,
        timestamp: new Date().toISOString(),
        referrer: document.referrer || 'direct',
        location: 'unknown'
      }

      const stats = getClickStats()
      stats.push(newClick)
      storeClickStats(stats)

      window.location.href = match.originalUrl
    } else {
      alert('Invalid or expired link')
    }
  }, [shortcode])

  return <div>Redirecting...</div>
}

export default RedirectHandler
