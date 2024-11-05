import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

export const styles: { [key: string]: SxProps<Theme> } = {
  container: {
    marginTop: 5,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 3,
    backgroundColor: '#fff',
    borderRadius: 2,
    boxShadow: 3,
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
};
