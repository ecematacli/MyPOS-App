import { makeStyles } from '@mui/styles'

interface StyleProps {
  counted: number
  expected: number
}

export default makeStyles(({ spacing, palette }) => ({
  tableBodyRow: {
    height: spacing(10),
    maxHeight: spacing(10),
    '& > td': {
      borderBottom: `1px solid ${palette.grayColors[19]}`,
      height: 'auto',
      color: ({ counted, expected }: StyleProps) =>
        counted === expected ? `${palette.primary.main}` : 'unset',
      maxHeight: spacing(10),
    },
    cursor: 'auto',
  },
  batchFirstCellDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  adjustIconSpan: {
    marginLeft: -14,
    width: 27,
    display: 'flex',
    alignItems: 'center',
  },
  adjustIcon: {
    color: palette.primary.main,
  },
}))
