import React, { FC } from "react"

function Layout(props: {
  children: React.ReactNode
  detail: React.ReactNode
}) {


  return (
    <div>
      {props.children}
      {props.detail}
    </div>
  )
}

export default Layout
