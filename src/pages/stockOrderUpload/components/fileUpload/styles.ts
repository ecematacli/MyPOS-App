import { makeStyles } from '@material-ui/core/styles'

interface StyleProps {
  uploadedFileName: string
}

export default makeStyles(({ palette, spacing }) => ({
  fileUploadDiv: {
    cursor: 'pointer',
    height: spacing(28),
    width: spacing(53),
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.14)',
    border: `0.7px dashed ${palette.grayColors[14]}`,
    padding: spacing(1, 1.5),
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      backgroundColor: ({ uploadedFileName }: StyleProps) =>
        uploadedFileName ? 'unset' : '#eee',
    },
  },
  dropInput: {
    width: '100%',
    height: '30vh',
    position: 'absolute',
    opacity: 0,
  },
  uploadIcon: {
    fontSize: spacing(4),
    color: palette.secondary.main,
  },
  infoText: {
    marginTop: -0.5,
  },
  selectBtn: {
    marginTop: 10,
    cursor: 'pointer',
  },
  uploadedFileInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  fileName: {
    marginRight: spacing(1.5),
    wordBreak: 'break-all',
  },
  clearIcon: {
    color: palette.grayColors[7],
    display: 'flex',
    alignItems: 'center',
    fontSize: spacing(2.5),
  },
}))
