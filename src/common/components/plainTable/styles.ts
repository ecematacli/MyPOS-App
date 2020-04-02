import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  table: {
    width: '60%'
  },
  tableHeadRow: {
    borderBottom: `1px solid ${palette.secondary.light} `
  },
  tableBodyRow: {
    '& > td': {
      borderBottom: '1px dashed rgba(224, 224, 224, 1)',
      '&:last-child': {
        '& > td': {
          borderBottom: 'none'
        }
      }
    }
  },
  firstCell: { paddingLeft: spacing(7) },
  paginationDiv: {
    marginTop: spacing(2),
    fontSize: spacing(2),
    width: '63%'
  }
}));
