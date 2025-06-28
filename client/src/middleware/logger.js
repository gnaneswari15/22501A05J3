const log = (message) => {
  const timestamp = new Date().toISOString()
  const formatted = `[${timestamp}] ${message}`
  // Instead of console.log, push logs to a UI-friendly structure
  localStorage.setItem('logs', JSON.stringify([
    ...(JSON.parse(localStorage.getItem('logs')) || []),
    formatted
  ]))
}

export default log
