import { Card as MUI_Card, CardContent, Box } from '@mui/material';

export function Card({ children }) {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh', // Ocupa toda la altura de la pantalla
    }}>
      <MUI_Card sx={{
        maxWidth: 400,
        width: '100%',
        p: 3,
        bgcolor: '#fbe1e1',
        borderRadius: 2,
        boxShadow: 3,
        '&:hover': {
          bgcolor: '#eecbcb',
        }
      }}>
        <CardContent>
          {children}
        </CardContent>
      </MUI_Card>
    </Box>
  );
}
