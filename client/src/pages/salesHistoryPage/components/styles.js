import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  tableResponsive: {
    width: '100%',
    marginTop: spacing(3),
    overflowX: 'auto'
  },
  table: {
    width: '90%',
    maxWidth: '90%',
    minHeight: '90vh',
    marginBottom: 0,
    backgroundColor: 'transparent',
    margin: 'auto auto',
    borderCollapse: 'separate',
    borderSpacing: '0 15px'
  },
  tableBodyRow: {
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)'
  },
  tableCell: {
    padding: 32
  },
  greenRow: {
    background: '#f9fcf9'
  },
  whiteRow: {
    background: 'white'
  }
}));
