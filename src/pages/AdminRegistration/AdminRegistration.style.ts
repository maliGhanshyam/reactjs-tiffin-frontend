import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

export const styles: { [key: string]: SxProps<Theme> } = {
  container: {
    marginTop: 3,
    marginBottom: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 3,
    backgroundColor: '#fff',
    borderRadius: 2,
    boxShadow: 3,
  },
  heading:{
      fontWeight: "bold",
      color: "primary.main",
      fontSize: { xs: '1.4rem', sm: '1.5rem' },
  },
  button: {
    mt: 3,
    mb: 2,
  },
  errorText: {
    display: 'block',
    textAlign: 'left',
    mt: 0.5,
    ml: 2,
  },
  organizationPlaceholder: {
    color: '#616161', 
  },
  organizationError: {
    color: '#d32f2f', 
  },
};
