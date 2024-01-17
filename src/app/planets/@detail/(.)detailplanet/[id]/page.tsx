'use client'
import Modal from "@/app/components/modal";
import styles from "./styles/detail.module.css"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { IPlanet } from "../../../../../../types/swapi";
import { createWishlistService, deleteWishlistService, getWishlistByIdService } from "../../../../../../services/wishlist";
import { getPlanetById } from "../../../../../../services/planets";
import { LoadingType } from "../../../../../../types/index";
import { WishlistType } from "../../../../../../types";
import Image from "next/image";


interface Wishlist {
  data?: WishlistType;
  status: LoadingType;
  value: true | false
}

interface Planet {
  data?: IPlanet;
  status: LoadingType;
}

function DetailPage(props: {
  params: { id: string }
}) {

  const { data: session, status } = useSession()
  const router = useRouter()
  const [planet, setPlanet] = useState<Planet>({
    status: "idle",
  })
  const [wishlist, setWishlist] = useState<Wishlist>({
    status: "idle",
    value: true
  })

  const handleClose = () => {
    router.back()
  }

  const handleWishlist = async () => {
    setWishlist(prev => ({
      ...prev,
      status: "loading"
    }))
    if (status == "unauthenticated") {
      router.push("/auth")
    }
    try {
      if (wishlist.value) {
        const res = await deleteWishlistService(session?.accessToken, wishlist?.data?.id!)
        if (res) {
          setWishlist(prev => ({
            ...prev,
            value: false,
            status: "success"
          }))
        }
      } else {
        const res = await createWishlistService(session?.accessToken, props.params.id)
        if (res) {
          setWishlist({
            data: res.data,
            status: "success",
            value: true
          })
        }
      }
    } catch (error) {
      setWishlist(prev => ({
        ...prev,
        status: "error"
      }))
    } finally {
      setWishlist(prev => ({
        ...prev,
        status: "idle"
      }))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setPlanet(prev => ({
        ...prev,
        status: "loading"
      }))
      setWishlist(prev => ({
        ...prev,
        status: "loading"
      }))
      try {
        const res = await getPlanetById(props.params.id)
        if (res) {
          setPlanet(prev => ({
            ...prev,
            data: res
          }))
          const res_2 = await getWishlistByIdService(session?.accessToken, props.params.id)
          if (res_2) {
            setWishlist({
              value: res_2.status,
              data: res_2.data,
              status: "success"
            })
          }
          setPlanet(prev => ({
            ...prev,
            status: "success"
          }))
        }
      } catch (error) {
        throw new Error("Error")
      } finally {
        setPlanet(prev => ({
          ...prev,
          status: "idle"
        }))
      }
    }
    fetchData()
    const currentScroll = localStorage.getItem("/planets")

    if (typeof window !== "undefined") {
      if (currentScroll) {
        window.scrollTo(0, parseInt(currentScroll))
      }
    }
  }, [])

  return (
    <Modal onClose={handleClose}>
      {
        planet.status === "loading" ? (
          <Image src="/loading.png" width={60} height={60} alt='loading' className='w-[55px] aspect-square animate-spin' />
        ) : (
          <div className={styles.main}>
            <h1 className={styles.name}>{planet?.data?.name}</h1>
            <div className={styles.containerData}>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>Rotasi</td>
                      <td> :{planet?.data?.name}</td>
                    </tr>
                    <tr>
                      <td>Orbit</td>
                      <td> :{planet?.data?.orbital_period}</td>
                    </tr>
                    <tr>
                      <td>Climate</td>
                      <td> :{planet?.data?.climate}</td>
                    </tr>
                    <tr>
                      <td>Diamtere</td>
                      <td> :{planet?.data?.diameter}</td>
                    </tr>
                    <tr>
                      <td>Gravitasi</td>
                      <td> :{planet?.data?.gravity}</td>
                    </tr>
                    <tr>
                      <td>Terrain</td>
                      <td> :{planet?.data?.terrain}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>Surface</td>
                      <td> :{planet?.data?.surface_water}</td>
                    </tr>
                    <tr>
                      <td>Population</td>
                      <td> :{planet?.data?.population}</td>
                    </tr>
                    <tr>
                      <td>Created</td>
                      <td> :{planet?.data?.created.toString()}</td>
                    </tr>
                    <tr>
                      <td>Edited</td>
                      <td> :{planet?.data?.edited.toString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.containerButton}>
              <button
                onClick={() => handleWishlist()}
                className="px-4 py-2 bg-primary rounded-md text-[white]"
                disabled={wishlist.status === "loading"}
              >
                {wishlist.status == "loading" ? (
                  <Image src="/loading.png" width={30} height={30} alt='loading' className='w-[30px] aspect-square animate-spin' />
                ) : (
                  wishlist.value ? "Hapus" : "Tambah"
                )}
              </button>
              <button
                onClick={() => router.back()}
                className="px-4 py-2 bg-primary rounded-md text-[white]"
              >
                Kembali
              </button>
            </div>
          </div>
        )
      }
    </Modal>
  )
}

export default DetailPage
