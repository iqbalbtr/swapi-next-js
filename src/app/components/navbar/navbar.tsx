'use client'
import Link from "next/link"
import styles from "./navbar.module.css"
import { useSession } from "next-auth/react"
import { useState } from "react"
import UserCard from "../cards/user/userCard"

function Navbar() {
    const { data: session, status }: { data: any, status: string } = useSession()
    const { user } = session || {}
    const [isUser, setIsUser] = useState<boolean>(false)

    const handleUser = () => {
        setIsUser(cur => !cur)
    }

    return (
        <nav className="container">
            <div className={styles.main}>
                <Link href={"/"} className={styles.logo}>
                    <i className={styles.rocket}>🚀</i>
                    <span>Swapi</span>
                </Link>

                <div className={styles.containerLink}>
                    {
                        status === "authenticated" ? (
                            <>
                                {isUser && <UserCard img={user.image} name={user.name} onClose={handleUser} />}
                                <Link href={"/wishlist"} className={styles.wishlist}>
                                    WishList
                                </Link>
                                <img onClick={() => handleUser()} className={styles.img} src={user.image} alt="" />
                            </>
                        ) : <Link href={"/auth"} className={styles.login}>
                            Login
                        </Link>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
