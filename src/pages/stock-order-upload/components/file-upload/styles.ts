import { Box } from '@mui/material'
import GetAppIcon from '@mui/icons-material/GetApp'
import ClearIcon from '@mui/icons-material/Clear'
import { styled } from '@mui/material/styles'

export const UploadContainer = styled(Box)<{ uploadedFileName?: string }>(
  ({ theme, uploadedFileName }) => ({
    cursor: 'pointer',
    height: theme.spacing(28),
    width: theme.spacing(53),
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.14)',
    border: `0.7px dashed ${theme.palette.grayColors[14]}`,
    padding: theme.spacing(1, 1.5),
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
      backgroundColor: uploadedFileName ? 'unset' : '#eee',
    },
  })
)

export const StyledUploadIcon = styled(GetAppIcon)(({ theme }) => ({
  fontSize: theme.spacing(4),
  color: theme.palette.secondary.main,
}))

export const StyledClearIcon = styled(ClearIcon)(({ theme }) => ({
  color: theme.palette.grayColors[7],
  display: 'flex',
  alignItems: 'center',
  fontSize: theme.spacing(2.5),
}))

export const UploadInput = styled(Box)({
  width: '100%',
  height: '30vh',
  position: 'absolute',
  opacity: 0,
})

export const FileNameContainer = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1.5),
  wordBreak: 'break-all',
}))
