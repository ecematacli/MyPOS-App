import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({ palette, spacing, breakpoints }) => ({
  container: {
    paddingTop: spacing(4),
  },
  titleContainer: {
    maxWidth: spacing(137.5),
    margin: '0 auto',
    marginBottom: spacing(2),
  },
  actionsBar: {
    backgroundColor: '#f1f3f5',
    padding: '28px 48px',
  },
  infoText: {
    color: palette.secondary.main,
    paddingRight: spacing(2.5),
    width: '80%',
  },
  title: {
    fontSize: spacing(3.2),
    fontWeight: 'bold',
    color: palette.grayColors[17],
  },
  actionSectionWrapper: {
    margin: '0 auto',
    maxWidth: spacing(137.5),
  },
  tableSectionWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: spacing(137.5),
    margin: '0 auto',
  },
  content: {
    maxWidth: spacing(137.5),
    margin: '0 auto',
    paddingTop: spacing(4),
    minHeight: '70vh',
  },
}))
