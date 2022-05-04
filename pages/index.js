import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Showcase from '../components/sampleComponent'

import detectEthereumProvider from '@metamask/detect-provider'
import { useState, useEffect } from 'react'
import Web3 from 'web3'

async function connect() {
  console.log("window.ethereum:", window.ethereum)

  const provider = await detectEthereumProvider()
  console.log("provider:", provider)

  if (provider) {

    console.log('Ethereum successfully detected!')

    const chainId = await provider.request({
      method: 'eth_chainId'
    })

    console.log("chainId:", chainId)
  } else {

    console.error('Please install MetaMask!', error)
  }
}


export default function Home() {

  const [web3, setWeb3] = useState(null)
  const [address, setAddress] = useState(null)

  // const [textPreference, setTextPreference] = useState("big")
  const [themePreference, setThemePreference] = useState("light")

  const [tempAddress, setTempAddress] = useState("randomID")
  const [pixelPreference, setPixelPreference] = useState("10")

  const [userSettings, setUserSettings] = useState(null)

  useEffect(() => {
    window.ethereum ?
      ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
        if (address) {
          console.log("address:", address)
        }
        else {
          console.log("accounts:", accounts)
          setAddress(accounts[0])
          let w3 = new Web3(ethereum)
          setWeb3(w3)
        }

      }).catch((err) => console.log(err))
      : console.log("Please install MetaMask")
  }, [address])



  async function setPreferences(e) {
    if (address) {
      const res = await fetch(`/api/store`, {
        method: "POST",
        body: JSON.stringify({
          accountID: address,
          // textPreference: textPreference, 
          themePreference: themePreference,
          pixelPreference: pixelPreference,
        })
      })
      const data = await res.json()
      console.log("Set res:", data)
    }
    else {
      console.log("No account address is given", address)
    }

  }

  async function getPreferences(e) {
    const res = await fetch(`/api/fetch/${tempAddress}`, { method: "GET" })
    const data = await res.json()
    console.log("get res:", data.result)
    console.log("theme:", data.result.themePreference)

    setUserSettings(data.result)

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

      <h1>hi</h1>
      <h2>Chain ID: { }</h2>
      <button onClick={connect}> Connect Metamask </button>

      <button onClick={setPreferences}> Set foo bar </button>
      <button onClick={getPreferences}> Get foo </button>

      <button onClick={handleDarkMode}> Dark mode </button>
      <select onClick={handleOption}>
        <option value="10">10px</option>
        <option value="20">20px</option>
      </select>

      <Showcase userSettings={userSettings} />

    </div>
  )
}
