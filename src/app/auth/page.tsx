'use client'
import { signIn } from 'next-auth/react'
import styles from "./styles/auth.module.css"

function LoginPage() {

  return (
    <div className={styles.main}>
      <div className={styles.containerLogin}>
        <h1 className={styles.title}>Selamat datang</h1>
        <p className={styles.p}>Silakan login terlebih dahulu</p>
        <button className={styles.btnLogin} onClick={() => signIn("google", { redirect: false, callbackUrl: "/" })}><img className={styles.icon} src='/google_icon.png' /> Sign In with google</button>
      </div>
    </div>
  )
}

export default LoginPage
