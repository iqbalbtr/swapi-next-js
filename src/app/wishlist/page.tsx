"use client"
import React, { useEffect, useState } from 'react'
import styles from "./style/wishlist.module.css"
import { useSession } from 'next-auth/react'
import { LoadingType } from '../../../types/index'
import { deleteWishlistService, getWishlistService } from '../../../services/wishlist'
import { WishlistType } from '../../../types'
import Link from 'next/link'
import Loading from '../components/loading'
import { useRouter } from 'next/navigation'


interface Wishlist {
  data: WishlistType[]
  status: LoadingType
}

interface Delete {
  index?: number;
  status: LoadingType;
}

interface Pagination {
  count: number;
  page: number;
  currentPage: number;
}

function WihsListPage() {

  const { data: session } = useSession()
  const [wishlist, setWishlist] = useState<Wishlist>({
    data: [],
    status: "idle"
  })
  const [deleteItem, setDeleteItem] = useState<Delete>({
    index: 0,
    status: "idle"
  })
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    count: 0,
    currentPage: 1
  })

  const handlerDelete = async (wishlistId: string, index: number) => {
    setDeleteItem({
      index: index,
      status: "loading"
    })
    try {
      const req = await deleteWishlistService(session?.accessToken, wishlistId)
      if (req) {
        setDeleteItem({
          index: index,
          status: "success"
        })

        setWishlist(prev => ({
          ...prev,
          data: wishlist.data.filter((wishlist: any) => wishlist.id !== wishlistId)
        }))
      }
    } catch (error) {
      throw new Error("Error")
    } finally {
      setDeleteItem({
        index: 0,
        status: "idle"
      })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setWishlist(prev => ({
        ...prev,
        status: "loading"
      }))
      try {
        const req = await getWishlistService(session?.accessToken, pagination.currentPage.toString())
        if (req) {
          setWishlist({
            status: "success",
            data: [...req.data.wishlist]
          })
          setPagination(prev => ({
            page: req.data.page,
            count: req.data.count,
            currentPage: req.data.currentPage
          }))
        }
      } catch (error) {
        setWishlist(prev => ({
          ...prev,
          status: "error"
        }))
      }
    }

    fetchData()
  }, [session, pagination.currentPage])

  return (
    <div className='container'>
      <div className={styles.main}>
        <h1 className={styles.wishlist}>Your Wislist</h1>
        <div className={styles.list}>
          {
            wishlist.status === "loading" ? (
              <Loading width={60} />
            ) : (
              <>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Climate</th>
                      <th>Diameter</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      wishlist.data.map((item: any, index: number) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.planet}</td>
                          <td>{item.climate}</td>
                          <td>{item.diameter}</td>
                          <td>
                            <button
                              style={{ backgroundColor: "var(--secondary-neon-color)", padding: "3px", borderRadius: "999px" }}
                              onClick={() => handlerDelete(item.id, index)}
                              disabled={deleteItem.status === "loading"}
                            >
                              {deleteItem.status === "loading" && deleteItem.index === index ? <Loading width={20} /> :    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} id="times"><path fill="#ddd" d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path></svg>}
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                {wishlist.data.length <= 0 && wishlist.status === "success" && <p className={styles.kosong}>"Kosong"</p>}
                <div
                  className={styles.pagination}
                >
                  {
                    pagination.currentPage !== 1 ? (
                      <Link
                        href={`?page=${pagination.currentPage - 1}`}
                        onClick={() => setPagination(prev => ({
                          ...prev,
                          currentPage: pagination.currentPage - 1
                        }))}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="angle-left" width={25}>
                          <path fill="#545454" d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"></path>
                        </svg>
                      </Link>
                    ) : null
                  }
                  <div className={styles.page}>
                    {
                      [...Array(pagination.page)].map((_: string, i: number) => (
                        <Link
                          key={i}
                          href={`?page=${i + 1}`}
                          onClick={() => setPagination(prev => ({
                            ...prev,
                            currentPage: i + 1
                          }))}
                          className={`${i + 1 === pagination.currentPage ? "bg-primary" : null} ${styles.btnPagination}`}
                        >
                          {i + 1}
                        </Link>
                      ))
                    }
                  </div>
                  {
                    pagination.currentPage < pagination.page ? (
                      <Link
                        href={`?page=${pagination.currentPage + 1}`}
                        onClick={() => setPagination(prev => ({
                          ...prev,
                          currentPage: pagination.currentPage + 1
                        }))}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="angle-right" width={25}>
                          <path fill="#545454" d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"></path>
                        </svg>
                      </Link>
                    ) : null
                  }
                </div>
              </>
            )
          }
          <Link
            href={"/"}
            className='bg-primary py-1 px-5 rounded-full'
          >
            Kembali
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WihsListPage
