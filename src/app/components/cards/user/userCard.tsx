import React from 'react'
import styles from "./styles/user.module.css"
import { signOut } from 'next-auth/react'

function UserCard(props: {img: string, name: string, onClose: Function}) {
  
  const hanldeSignout = () => {
    localStorage.removeItem("IEHiIiuIUgigIiGiGIugiUIuhIihUIGiGI")
    signOut()
  }

  return (
    <div className={styles.main}>
      <button onClick={() => props.onClose()} className={styles.tutup}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={15} id="times"><path fill="#ddd" d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path></svg>
      </button>
      <img className={styles.img} src={props.img} alt="" />
      <div className={styles.inner}>
        <span>{props.name}</span>
        <button className={styles.logout} onClick={() => hanldeSignout()}>Logout</button>
      </div>
    </div>
  )
}

export default UserCard
