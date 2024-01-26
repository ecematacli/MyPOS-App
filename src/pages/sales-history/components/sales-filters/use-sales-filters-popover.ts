import { useState } from 'react'

export const useSalesFiltersPopover = () => {
  const [anchorEl, setAnchorEl] = useState<null | Element>(null)

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return {
    open: Boolean(anchorEl),
    anchorEl,
    handleClick,
    handleClose,
  }
}
