
import React, { useContext } from "react";

import { Button } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { orange, green, grey, blueGrey, blue } from '@mui/material/colors'
import { useState } from 'react'

const lightTheme = createTheme({
  palette: {
    primary: {
      main: grey[400],
    },
    secondary: {
      main: green[400],
    },
    dark: {
      main: orange[400],
    }
  }
})

const darkTheme = createTheme({
  palette: {
    primary: {
      main: orange[400],
    },
    secondary: {
      main: green[100],
    },
    dark: {
      main: orange[100],
    }
  }
})

export default function Showcase(parameters) {
  // const { title, description } = useContext(FeedbackContext);

  // const userSettings = JSON.stringify(parameters).userSettings
  const userSettings = parameters.userSettings
  const [theme, setTheme] = useState(lightTheme)
  const [themeIsSet, setThemeIsSet] = useState(false)


  console.log("stuff", parameters)

  const items = []
  if (userSettings) {

    const obj = userSettings[0]
    console.log(22222222222, userSettings, userSettings["accountID"])

    for (const key in userSettings) {
      console.log(key, userSettings[key])
      items.push(<li key={key}> {key}: {userSettings[key]} </li>)
    }
    if(!themeIsSet){
      setTheme(userSettings["themePreference"] == "light" ? lightTheme : darkTheme)
      setThemeIsSet(true)
    }
  }

 

  return (

    <div style={{ height: 100, margin: 10 }}>
      <ThemeProvider theme={theme} >
        <Button color="primary" variant="contained" style={{
          margin: 10,
        }}>Some button</Button>
        {items}

      </ThemeProvider>

    </div>
  );
}




