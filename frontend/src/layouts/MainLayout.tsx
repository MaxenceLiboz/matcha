import React, { ReactNode } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import AppHeader from '../components/AppBar/Appbar';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const { isAuthenticated } = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      {isAuthenticated ? <AppHeader /> : null}
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          py: 3,
          px: { xs: 2, sm: 3 }
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;