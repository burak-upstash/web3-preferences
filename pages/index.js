import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Showcase from '../components/sampleComponent'

import detectEthereumProvider from '@metamask/detect-provider'
import { useState, useEffect } from 'react'
import Web3 from 'web3'

import { Button } from '@mui/material'


export default function Home() {

  // const [web3, setWeb3] = useState(null)
  const [accountAddress, setAccountAddress] = useState(null)

  // const [textPreference, setTextPreference] = useState("big")
  const [themePreference, setThemePreference] = useState("light")
  const [pixelPreference, setPixelPreference] = useState("10")

  const [userSettings, setUserSettings] = useState(null)
  const [chainID, setChainID] = useState(null)

  useEffect(() => {
    checkConnection()
    getPreferences()
    // return getPreferences()
  }, [accountAddress])

  // useEffect(() => {
    
  // }, [])

  async function checkConnection() {
    ethereum
      .request({ method: 'eth_accounts' })
      .then(accounts => {
        console.log(setAccountAddress(accounts[0]))
      })
      .catch(console.error);
  }

  async function connect() {
    window.ethereum ?
      ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
        if (accountAddress) {
          console.log("accountAddress:", accountAddress)
        }
        else {
          console.log("accounts:", accounts)
          setAccountAddress(accounts[0])
          // let w3 = new Web3(ethereum)
          // setWeb3(w3)
        }

      }).catch((err) => console.log(err))
      : console.log("Please install MetaMask")


    console.log("window.ethereum:", window.ethereum)

    const provider = await detectEthereumProvider()
    console.log("provider:", provider)

    if (provider) {

      console.log('Ethereum successfully detected!')
      const chainID = await provider.request({
        method: 'eth_chainId'
      })

      console.log("chainID:", chainID)
      setChainID(chainID)
      getPreferences()
    } else {

      console.error('Please install MetaMask!', error)
    }
  }

  async function setPreferences(e) {
    if (accountAddress) {
      const res = await fetch(`/api/store`, {
        method: "POST",
        body: JSON.stringify({
          accountID: accountAddress,
          // textPreference: textPreference, 
          themePreference: themePreference,
          pixelPreference: pixelPreference,
        })
      })
      const data = await res.json()
      console.log("Set res:", data)
    }
    else {
      console.log("No account accountAddress is given", accountAddress)
    }
  }

  async function getPreferences(e) {
    if (accountAddress) {
      const res = await fetch(`/api/fetch/${accountAddress}`, { method: "GET" })
      const data = await res.json()
      console.log("get res:", data.result)
      console.log("theme:", data.result.themePreference)

      setUserSettings(data.result)
    }
    else {
      console.log("No account connected yet!")
    }
  }

  function handleOption(e) {
    console.log("handle Option event:", e)
    console.log("handle Option target:", e.target.value)
    setPixelPreference(e.target.value)
  }

  function handleDarkMode(e) {
    setThemePreference(themePreference == "light" ? "dark" : "light")
    console.log(themePreference)
  }

  console.log("user settings", userSettings)

  return (
    <div className={styles.container}>

      <h2>{"Web3 Preferences Holder"}</h2>
      <p>
        {"Lets you keep user preferences on cross-websites"}
      </p>
      <Button variant="contained" onClick={connect}>Connect Metamask</Button>

      <h2>Current Chain ID: {chainID}</h2>

      <button onClick={setPreferences}> Set foo bar </button>
      <button onClick={getPreferences}> Get foo </button>

      <button onClick={handleDarkMode}> Dark mode </button>
      <select onClick={handleOption}>
        <option value="10">10px</option>
        <option value="20">20px</option>
      </select>

      <p>Sample Component/Page:</p>
      <Showcase userSettings={userSettings} />

    </div>

  )
}
