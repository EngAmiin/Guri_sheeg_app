import { Paper } from '@mui/material'
import React from 'react'

export default function Card({children,styles,backShadow}) {
  return (
    <Paper elevation={backShadow? backShadow : '2'} sx={{ ...styles }}>
      {children}
    </Paper>
  );
}
