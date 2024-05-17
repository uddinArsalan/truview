'use client'
import { Box, Typography, Grid, useTheme } from '@mui/material';

const AboutUs = () => {
  const theme = useTheme();

  return (
    <Box
    sx={{
      py: 8,
      bgcolor: theme.palette.background.default,
    }}
  >
    <Grid container spacing={4} alignItems="center" justifyContent="center">
      <Grid item xs={12} md={6}>
        <Typography
          variant="h1"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            fontSize: { xs: '3rem', md: '4rem' },
            textAlign: 'center',
          }}
        >
          Truview
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" component="h2" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          At Truview, we are passionate about empowering people to capture and share their most
          cherished moments through exceptional photo sharing experiences.
        </Typography>
        <Typography variant="body1" paragraph>
          Our cutting-edge platform is designed to provide a seamless and secure way to preserve
          your memories, while also fostering a vibrant community of photography enthusiasts.
        </Typography>
        <Typography variant="body1" paragraph>
          With a constantly evolving feature set, Truview stays ahead of the curve, ensuring that
          you have access to the latest tools and technologies for enhancing and sharing your
          visual stories.
        </Typography>
      </Grid>
    </Grid>
  </Box>
  );
};

export default AboutUs;