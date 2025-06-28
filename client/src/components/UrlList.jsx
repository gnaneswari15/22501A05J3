import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const UrlList = ({ shortenedUrls }) => {
  return (
    <div>
      {shortenedUrls.map((url) => (
        <Card key={url.id} style={{ marginTop: '16px' }}>
          <CardContent>
            <Typography>Original URL: {url.originalUrl}</Typography>
            <Typography>Short URL: http://localhost:3000/{url.shortcode}</Typography>
            <Typography>Expires At: {new Date(url.expiresAt).toLocaleString()}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UrlList;
