function Modal(props: {
    children: React.ReactNode,
    onClose: Function
}) {
  return (
    <div className="min-h-screen z-30 top-0 left-0 fixed w-full flex justify-center items-center">
      <div className="min-h-screen top-0 left-0 fixed w-full bg-[black]/50"
      onClick={() => props.onClose()}
      ></div>
      <div className="z-50">
        {props.children}
      </div>
    </div>
  )
}

export default Modal
