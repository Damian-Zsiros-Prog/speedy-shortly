import React from "react"
interface Props {
  open: boolean
  changeOpen: Function
  children?: any
}
export default function Modal({ open, changeOpen, children }: Props) {
  return (
    <>
      {open && (
        <dialog
          className={`fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center transition`}
        >
          <div className="bg-white m-auto p-8">
            <div className="flex flex-col items-center">
              <div className="my-3">{children}</div>
              <button
                type="button"
                className="bg-red-500 text-white p-2 "
                onClick={() => changeOpen()}
              >
                Cerrar
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  )
}
