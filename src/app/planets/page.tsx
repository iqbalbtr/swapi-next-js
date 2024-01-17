'use client'
import React, { useEffect, useState } from 'react'
import PlanetCard from '@/app/components/cards/planet'
import { IPlanet } from '../../../types/swapi'
import { useInView } from 'react-intersection-observer'
import { usePathname } from "next/navigation"
import styles from "./styles/planet.module.css"
import { getPlanetsByPage } from '../../../services/planets'
import Loading from '../components/loading'

function PlanetsPage() {

  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<IPlanet[]>([])
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      const fetchData = async () => {
        try {
          const planet = await getPlanetsByPage(page.toString())
          if (planet) {
            setData([...data, ...planet.results])
            setPage(cur => cur + 1)
          } else {
            return null
          }
        } catch (err) {
          console.log(err);
          return null
        }
      }
      if (page > 6) {
        return
      } else {
        fetchData()
      }
    }
  }, [inView])

  const pathname = usePathname()

  if ( typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY) {
        localStorage.setItem("/planets", scrollY.toString())
      }
    })
  }

  return (
    <div className={`container`}>
      <div className={`${styles.main} ${pathname !== "/planets" ? "pointer-events-none" : ""} `}>
        <h1 className={styles.title}>List Planet</h1>
        <div className={`${styles.list} `}>
          {
            data.map((data: IPlanet, index: number) => (
              <PlanetCard key={data.url} planet={data} index={index} />
            ))
          }
        </div>
        <div className={styles.pagination}>
          {
            page <= 6 ? (
              <div ref={ref}>
                <Loading width={60} />
              </div>
            ) : (
              <div>
                <span>End</span>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default PlanetsPage
