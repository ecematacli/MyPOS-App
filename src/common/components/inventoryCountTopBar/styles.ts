import { makeStyles } from '@material-ui/core/styles'

import { Props } from './index'

export default makeStyles(({ spacing, breakpoints }) => ({
  titleContainer: {
    height: spacing(6.25),
    display: 'block',
    position: 'relative',
    paddingLeft: spacing(3),
    margin: spacing(7, 0, 7.2),
    marginBottom: ({ type }: Props) => (type === 'countBatches' ? -2 : 'unset'),
    [breakpoints.down('md')]: {
      marginTop: spacing(8.5),
    },
  },
  titleWrapperDiv: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    maxWidth: spacing(137.5),
  },
  inventoryCountActionsContainer: {
    backgroundColor: '#f1f3f5',
    // position: 'relative',
    display: 'block',
    padding: spacing(3.5, 6),
    position: 'sticky',
    top: 0,
    zIndex: 99,
  },
  actionSectionWrapper: {
    display: 'block',
    margin: '0 auto',
    maxWidth: spacing(137.5),
  },
}))
