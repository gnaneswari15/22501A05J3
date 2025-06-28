import React, { useState } from 'react'
import { TextField, Button, Box, Typography, Grid } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import UrlList from './UrlList'
import log from '../middleware/logger'
import { isValidUrl, isValidShortcode, isValidMinutes } from '../utils/validation'
import { storeShortenedUrls } from '../utils/api'

const UrlShortenerForm = () => {
  const [urls, setUrls] = useState([{ id: uuidv4(), originalUrl: '', validity: '', shortcode: '' }])
  const [shortened, setShortened] = useState([])

  const handleChange = (index, field, value) => {
    const updated = [...urls]
    updated[index][field] = value
    setUrls(updated)
  }

  const addField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { id: uuidv4(), originalUrl: '', validity: '', shortcode: '' }])
    }
  }

  const generateShortcode = () => uuidv4().slice(0, 6)

  const handleSubmit = () => {
    const results = []
    const usedCodes = new Set()

    for (let u of urls) {
      if (!isValidUrl(u.originalUrl)) {
        alert('Invalid URL')
        log('Invalid URL submitted')
        return
      }

      const code = u.shortcode.trim() || generateShortcode()
      if (!isValidShortcode(code)) {
        alert('Invalid shortcode')
        return
      }

      if (usedCodes.has(code)) {
        alert(`Duplicate shortcode: ${code}`)
        return
      }

      usedCodes.add(code)

      const minutes = isValidMinutes(u.validity) ? parseInt(u.validity) : 30

      results.push({
        id: u.id,
        originalUrl: u.originalUrl,
        shortcode: code,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + minutes * 60000),
        clicks: []
      })

      log(`Short link created: ${code}`)
    }

    setShortened(results)
    storeShortenedUrls(results)
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {urls.map((u, i) => (
        <Grid container spacing={2} key={u.id} mb={2}>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Original URL" value={u.originalUrl}
              onChange={(e) => handleChange(i, 'originalUrl', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Validity (min)" value={u.validity}
              onChange={(e) => handleChange(i, 'validity', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Custom Shortcode" value={u.shortcode}
              onChange={(e) => handleChange(i, 'shortcode', e.target.value)} />
          </Grid>
        </Grid>
      ))}
      <Button onClick={addField} variant="outlined" disabled={urls.length >= 5}>Add Another URL</Button>
      <Button onClick={handleSubmit} variant="contained" style={{ marginLeft: 8 }}>Shorten</Button>
      <UrlList shortenedUrls={shortened} />
    </Box>
  )
}

export default UrlShortenerForm
