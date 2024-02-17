import React from 'react'
import { Box, Typography } from '@mui/material'

export const ProductsNotFound = () => {
  return (
    <Box
      data-testid='products-not-found'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'>
      <Box>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='200'
          height='170'
          viewBox='0 0 200 170'
          fill='none'>
          <g clipPath='url(#clip0_1061_158131)'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M104.118 147.446C141.439 147.446 171.693 117.35 171.693 80.2232C171.693 43.0969 141.439 13 104.118 13C66.7974 13 36.543 43.0969 36.543 80.2232C36.543 117.35 66.7974 147.446 104.118 147.446Z'
              fill='#EBEBEB'
            />
            <mask
              id='mask0_1061_158131'
              maskUnits='userSpaceOnUse'
              x='36'
              y='13'
              width='136'
              height='135'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M104.118 147.446C141.439 147.446 171.693 117.35 171.693 80.2232C171.693 43.0969 141.439 13 104.118 13C66.7974 13 36.543 43.0969 36.543 80.2232C36.543 117.35 66.7974 147.446 104.118 147.446Z'
                fill='white'
              />
            </mask>
            <g mask='url(#mask0_1061_158131)'></g>
            <g filter='url(#filter0_d_1061_158131)'>
              <path
                d='M93.9014 26.7099L172.118 26.7099V132.553H93.9014V26.7099Z'
                fill='#F5F5F5'
              />
              <path
                d='M105.959 120.376L139.02 120.236'
                stroke='#D2D3D3'
                strokeWidth='4.63961'
              />
              <path
                d='M105.958 109.405L160.767 109.655'
                stroke='#D2D3D3'
                strokeWidth='4.63961'
              />
              <rect
                x='105.958'
                y='40.2744'
                width='55.7656'
                height='60.2871'
                fill='#6E6E6E'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M151.588 56.1559L149.418 53.9856L134.14 69.2637L118.862 53.9856L116.691 56.1559L131.97 71.434L116.691 86.7121L118.862 88.8824L134.14 73.6043L149.418 88.8824L151.588 86.7121L136.31 71.434L151.588 56.1559Z'
                fill='white'
              />
            </g>
            <g filter='url(#filter1_d_1061_158131)'>
              <path
                d='M12 54.1254L88.7615 33.5572L116.595 137.432L39.8331 158L12 54.1254Z'
                fill='#F5F5F5'
              />
              <path
                d='M48.4651 142.878L80.8744 134.047'
                stroke='#D2D3D3'
                strokeWidth='4.34536'
              />
              <path
                d='M45.5789 132.112L99.4338 117.944'
                stroke='#D2D3D3'
                strokeWidth='4.34536'
              />
              <rect
                x='27.4004'
                y='64.2669'
                width='56.6589'
                height='61.2528'
                transform='rotate(-15 27.4004 64.2669)'
                fill='#6E6E6E'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M76.3575 67.8558L73.6569 66.2966L62.6806 85.3082L43.669 74.3318L42.1098 77.0325L61.1213 88.0088L50.145 107.02L52.8456 108.58L63.822 89.568L82.8335 100.544L84.3928 97.8437L65.3812 86.8674L76.3575 67.8558Z'
                fill='white'
              />
            </g>
          </g>
        </svg>
      </Box>
      <Typography
        sx={theme => ({
          color: theme.palette.grayColors[3],
        })}>
        Ürün bulunamadı. Lütfen farklı bir arama yapın.
      </Typography>
    </Box>
  )
}
