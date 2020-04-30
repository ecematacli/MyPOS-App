import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  tableBodyRow: {
    height: spacing(10),
    maxHeight: spacing(10),
    '& > td': {
      borderBottom: '1px solid #e9e9e9',
      height: 'auto',
      maxHeight: spacing(10),
      width: '30%',
      '&:first-child': {
        width: '40%',
      },
      '&:last-child': {
        '& > td': {
          borderBottom: 'none',
        },
      },
    },
  },
  batchNameCell: {
    paddingLeft: spacing(2),
    cursor: 'pointer',
  },
  batchNameCellDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  adjustIconSpan: {
    marginLeft: -8,
    marginRight: 4.5,
    width: 40,
  },
  adjustIcon: {
    color: palette.primary.main,
  },
}));
