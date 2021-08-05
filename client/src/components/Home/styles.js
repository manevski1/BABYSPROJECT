import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
    opacity: '0',
  },
  pagination: {
    display: 'none',
    visibility: 'none',
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
    opacity: '0',
  },
  gridContainer: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));
