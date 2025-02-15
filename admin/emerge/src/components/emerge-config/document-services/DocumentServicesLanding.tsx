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
    id: 'check-images',
    title: 'Check Images',
    path: '/admin/emerge-config/document-services/check-images',
    icon: ImageIcon,
    description: 'Configure check image viewing and storage settings'
  },
  {
    id: 'check-reorder',
    title: 'Check Reorder',
    path: '/admin/emerge-config/document-services/check-reorder',
    icon: RefreshIcon,
    description: 'Manage check reordering services and options'
  },
  {
    id: 'info-image-estatements',
    title: 'InfoImage E-statements',
    path: '/admin/emerge-config/document-services/info-image-estatements',
    icon: DescriptionIcon,
    description: 'Configure information image and e-statement settings'
  },
  {
    id: 'custom-pages',
    title: 'Custom Pages',
    path: '/admin/emerge-config/document-services/custom-pages',
    icon: ArticleIcon,
    description: 'Manage custom page configurations and content'
  }
];
const DocumentServicesLanding: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        Document Services
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.primary' }}>
        Configure document service settings for the Emerge platform.
      </Typography>
      <Grid container spacing={3}>
        {navigationCards.map((card) => {
          const Icon = card.icon;
          return (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => navigate(card.path)}
                  sx={{ height: '100%' }}
                >
                  <CardContent>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        mb: 2
                      }}
                    >
                      <Icon 
                        sx={{ 
                          fontSize: 32,
                          color: 'primary.main',
                          mr: 1
                        }} 
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
        })}
      </Grid>
    </Box>
  );
};
export default DocumentServicesLanding;