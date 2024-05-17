"use client";
import React, { useState } from 'react';
import { Grid, Paper, Box, Typography, Avatar, IconButton, Badge, useMediaQuery, useTheme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import WavingHandIcon from '@mui/icons-material/WavingHand';

interface PostProps {
  value: number;
  index: number;
  user: any;
}

const Post = ({ value, index, user }: PostProps) => {
  const [spacing, setSpacing] = useState(2);
  const email = user?.email as string;
  console.log(email);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value));
  };

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = React.useState(0);
  const [comments, setComments] = React.useState(0);
  const [shares, setShares] = React.useState(0);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleComment = () => {
    setComments(comments + 1);
  };

  const handleShare = () => {
    setShares(shares + 1);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid item xs={12} sm={6} md={4} mb={4} >
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <Image
          src={`https://source.unsplash.com/1600x900/?movies&n=${index}`}
          alt="Post"
          style={{ width: '100%', backgroundSize: 'cover' }}
          width={isSmallScreen ? 300 : 400}
          height={isSmallScreen ? 200 : 300}
        />
        <Box p={2}>
          <Typography variant="body1" noWrap>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident repellendus voluptate cumque laboriosam
            fugit iste qui necessitatibus natus vero facere, saepe temporibus nemo.
          </Typography>
          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <IconButton onClick={handleLike} size="small" sx={{ mr: 1 }}>
                {liked ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon color="action" />
                )}
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {likes}
              </Typography>
              <IconButton onClick={handleComment} size="small" sx={{ ml: 2, mr: 1 }}>
                <Badge badgeContent={comments} color="primary">
                  <ChatBubbleOutlineIcon />
                </Badge>
              </IconButton>
              <IconButton onClick={handleShare} size="small">
                <Badge badgeContent={shares} color="primary">
                  <ShareIcon />
                </Badge>
              </IconButton>
            </Box>
            <Avatar src={`https://source.unsplash.com/200x200/?person&n=${value}`} />
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

const WelcomeMessage = () => {
  const theme = useTheme();
  const {user} = useUser();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mb={4}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          color: theme.palette.primary.main,
          display: 'flex',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <WavingHandIcon fontSize="inherit" sx={{ mr: 1 }} />
        Welcome{' '}
        {user
          ? user.nickname
            ? `${user.nickname.split(' ')[0]}!`
            : 'User!'
          : 'User!'
        }
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="center"
        sx={{ maxWidth: 400 }}
      >
        Share your amazing moments with the world and connect with friends.
      </Typography>
    </Box>
  );
};

const SocialMediaFeed = () => {
  const { user, error, isLoading } = useUser();
  const postValues = [16, 27, 32, 45, 7, 9, 237, 58];
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box py={6} px={isSmallScreen ? 2 : 6}  sx={{backgroundColor: theme.palette.background.default}}>
      <WelcomeMessage />
      <Grid container spacing={4} justifyContent="center">
        {postValues.map((value, index) => (
          <Post key={index} value={value} index={index} user={user} />
        ))}
      </Grid>
    </Box>
  );
};

export default SocialMediaFeed;