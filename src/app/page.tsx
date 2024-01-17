'use client'
import Link from "next/link"
import styles from "./styles/home.module.css"
import Image from "next/image"


export default function Home() {

  return (
    <div className="container">
      <div className={styles.main}>
        <Image className={styles.planet} src="/planets_main.png" width={800} height={800} alt="planet.png" />
        <h1 className={styles.brand}>Swapi Planet</h1>
        <span className={styles.subBrand}>Next Js App </span>
        <Link href="/planets">
          <button className={styles.seeMore}>
            Lihat
          </button>
        </Link>
      </div>
    </div>
  )
}
