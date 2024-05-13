import { Container } from '@mui/material'
import React from 'react'

export default function Wrapper({children,styles}) {
  return (
    <Container sx={{...styles}}>
            {children}
    </Container>
  )
}
