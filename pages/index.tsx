import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const router = useRouter();
  const { invitation } = router.query
  const [email, setEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [IsSubmitting, setIsSubmitting] = useState(false)
  const [multipleemails, setMultipleEmails] = useState(false)
  const triggerErrorPopup = (error: string) => {
    setError(error)
    console.log(error);
    window.alert(error);
  }
  const submitHandler = async () => {
    try {
      if (email.includes(','))
        setMultipleEmails(true)
      setIsSubmitting(true)

      const response = await window.fetch('/api/auth',
        {
          method: "POST",
          body: JSON.stringify({ "email": email, "inviteCode": inviteCode })
        })
      if (response.status === 422 || 404 || 500) {
        setIsSubmitting(false)

        console.log(response);
      }
      if (response.status === 201 || 200) {
        setIsSubmitting(false)

        setSuccess(true);
        console.log(response);
      }

    } catch (error: any) {
      console.log(error.message);
    }
  }
  React.useEffect(() => {
    if(invitation)
    setInviteCode(invitation as string)
  })
  return (
    <div className={styles.container}>
      <div className={styles.patternContainer}
      style={{"position":"fixed", bottom:0, right:0 }}
      >
        <img src="/pattern.svg"/>
      </div>
      <Head>
        <title>API FEST 2022</title>
        <meta name="description" content="Learn. Build. Develop and be API First! with Postman" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <p style={{ color: "white", textAlign: 'center' }}>
          {
            invitation &&
            <b>
              INVITE CODE APPLIED
            </b>

          }<br /><br />
          {
            multipleemails && <b>Multiple emails may take some time.</b>
          }
        </p>
        {

        }
        <div className={styles.inputContainer}>
          <div className={styles.logoContainer}>
            <div style={{ "textAlign": "center" }}>
              <img style={{ "marginBottom": '1px' }} src="/postman-logo-stacked.svg" width="100px" height="100px" />

              <h1>
                API Fest 2022
              </h1>
            </div>
          </div>
          <input
            disabled={success}
            className={styles.inputName}
            placeholder="Email used for registration" type="Your " value={email}
            onChange={(e) => { setEmail(e.target.value) }}>
          </input>
          <input
            disabled={success}

            className={styles.inputInviteCode}
            placeholder='Your Invite Code ...' type="text" value={inviteCode} onChange={(e) => { setInviteCode(e.target.value) }}>

          </input>
          <div
            className={styles.submitButtonContainer}
          >
            {!success &&
              <div
                className={styles.submitButton}
                style={{ background: "black", color: 'white' }} onClick={submitHandler}>
                {
                  success ? "Invite Sent" : IsSubmitting ? "Joining..." : "Join"
                }
              </div>}<br />

            {success && <>
              Please check your email for the invite link.<br />
              Make sure to check promotions/ updates or spam.
            </>}
          </div></div>

      </main>
      <div
        className={styles.footer}
      >
        <span style={{}}>
          Developed by
          Abir, <a
            style={{ color: 'orange', display: 'inline' }}
            href="https://twitter.com/imabptweets" target="_blank"
            rel="noopener noreferrer"
          >
            @imabptweets </a> with love for
          <a
            style={{ color: 'orange', display: 'inline' }}
            href="https://discord.com/invite/bKjz3CXbB6" target="_blank"
            rel="noopener noreferrer"
          >
             &nbsp; Postman Student Community
          </a>
        </span>
      </div>
    </div>
  )
}

export default Home
