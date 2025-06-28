import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UrlShortenerForm from './components/UrlShortenerForm'
import StatsPage from './components/StatsPage'
import RedirectHandler from './components/RedirectHandler'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortenerForm />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </Router>
  )
}

export default App
