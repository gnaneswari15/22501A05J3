import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { getShortenedUrls, getClickStats } from '../utils/api';

const StatsPage = () => {
  const links = getShortenedUrls();
  const stats = getClickStats();

  const groupedStats = stats.reduce((acc, click) => {
    if (!acc[click.shortcode]) acc[click.shortcode] = [];
    acc[click.shortcode].push(click);
    return acc;
  }, {});

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>URL Statistics</Typography>
      {links.map(link => (
        <Card key={link.id} sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6">Short URL: http://localhost:3000/{link.shortcode}</Typography>
            <Typography>Original URL: {link.originalUrl}</Typography>
            <Typography>Created At: {new Date(link.createdAt).toLocaleString()}</Typography>
            <Typography>Expires At: {new Date(link.expiresAt).toLocaleString()}</Typography>
            <Typography>Total Clicks: {groupedStats[link.shortcode]?.length || 0}</Typography>

            {(groupedStats[link.shortcode] || []).map((click, index) => (
              <Box key={index} mt={2} pl={2} style={{ borderLeft: '2px solid #ddd' }}>
                <Typography>🔹 Time: {new Date(click.timestamp).toLocaleString()}</Typography>
                <Typography>🔹 Referrer: {click.referrer}</Typography>
                <Typography>🔹 Location: {click.location}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default StatsPage;
