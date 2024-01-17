import React from 'react'
import { IPlanet } from '../../../../types/swapi';
import Link from 'next/link';
import styles from "./styles/planet.module.css"
import { spreadLink } from '../../../../utils/spreadlink';
import { MotionDiv } from '../framerMotion/MotionDiv';


function PlanetCard(props: {
  planet: IPlanet,
  index: number
  setIsModal?: () => void
}) {

  const { name, rotation_period, orbital_period, diameter, climate, gravity, terrain, url } = props.planet;
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  return (
    <MotionDiv
    variants={variants}
    initial="hidden"
    animate="visible"
    transition={{
      delay: props.index * 0.15,
      ease: "easeInOut",
      duration: 0.3
    }}
    viewport={{ amount: 0 }}
      className={styles.main}>
      <h1 className={styles.name}>{name}</h1>
      <div className={styles.content}>
        <table>
        <tbody>
          <tr>
            <td>Rotasi</td>
            <td> :{rotation_period}</td>
          </tr>
          <tr>
            <td>Orbit</td>
            <td> :{orbital_period}</td>
          </tr>
          <tr>
            <td>Diameter</td>
            <td> :{diameter}</td>
          </tr>
          <tr>
            <td>Climate</td>
            <td> :{climate}</td>
          </tr>
          <tr>
            <td>Gravity</td>
            <td> :{gravity}</td>
          </tr>
          <tr>
            <td>Terrain</td>
            <td> :{terrain}</td>
          </tr>
        </tbody>
        </table>
      </div>
      <Link onClick={() => props.setIsModal} className={styles.link} href={`/planets/detailplanet/${spreadLink(url)}`}>
        Lihat
      </Link>
    </MotionDiv>
  )
}

export default PlanetCard
