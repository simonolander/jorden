'use client'

import countries from "./countries.json"
import {Box, Button, Stack, Typography, useMediaQuery} from "@mui/material";

export default function Home() {
    const landscape = useMediaQuery('(orientation: landscape)')
  const country = countries[Math.floor(Math.random() * countries.length)];
  const options = [country]
  while (options.length < 4) {
    let option = countries[Math.floor(Math.random() * countries.length)];
    if (options.some(opt => opt.country === option.country)) {
      continue
    }
    options.push(option)
  }
  options.sort(() => Math.random() - 0.5)
  return (
      <Stack direction={landscape ? "row" : "column"} sx={{p: 2}} spacing={2} justifyContent="center" alignItems="center">
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
              <Typography variant="h3">Where are we?</Typography>
              <Box
                  component="img"
                  src={country.svg}
                  alt={"Where are we?"}
                  width="100%"
              />
          </Stack>
          <Stack direction="column" spacing={2} justifyContent="center" fullfillWidth>
              {
                  options.map((option, i) => (
                      <Button key={i} variant="contained" fullWidth>
                          {option.country}
                      </Button>
                  ))
              }
          </Stack>
      </Stack>
  )
}
