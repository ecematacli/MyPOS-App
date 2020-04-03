import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing }) => ({
  tableBodyRow: {
    '& > td': {
      borderBottom: '1px dashed rgba(224, 224, 224, 1)',
      width: '15.3%',
      '&:nth-child(2)': {
        width: '27%'
      },
      '&:nth-child(3)': {
        width: '27%'
      },
      '&:last-child': {
        '& > td': {
          borderBottom: 'none'
        }
      }
    }
  },
  batchNameCell: {
    paddingLeft: spacing(2),
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}));
