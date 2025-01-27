import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import RefreshIcon from '@mui/icons-material/Refresh';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';

interface NavigationCard {
  id: string;
  title: string;
  path: string;
  icon: React.ElementType;
  description: string;
}

const navigationCards: NavigationCard[] = [
  {



  {
  {
  {
  {
];


    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
      </Typography>

      <Grid container spacing={3}>
        {navigationCards.map((card) => {
          
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <Card 
                  '&:hover': {
              >
                <CardActionArea 
                >
                  <CardContent>
                    <Box 
                    >
                      <Icon 
                      />
                      <Typography variant="h6" component="div">
                        {card.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
      </Grid>
    </Box>
  );

