'use client'
import Image from 'next/image'
import Logo from '../../public/hpalogo.svg'
import SideIconPet from '../../public/sideiconpet.svg'
import AddMoreIcon from '../../public/add-plus-svgrepo-com.svg'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useState } from 'react'
import CreatePetForm from './CreatePetForm'

const SideBar = () => {
  const [showAdMenu, setShowAdMenu] = useState(false)
  const [modalToOpen, setModalToOpen] = useState('')
  const closeModal = () => {
    setShowAdMenu(false)
  }
  return (
    <aside className="flex">
      <div className="flex flex-col items-center w-16 h-screen py-8 space-y-8 bg-white dark:bg-gray-900 dark:border-gray-700">
        <a href="#">
          <Image className="w-auto h-8" src={Logo} alt="" />
        </a>

        <a
          href="#"
          className="p-1.5 text-blue-500 transition-colors duration-200 bg-blue-100 rounded-lg dark:text-blue-400 dark:bg-gray-800"
        >
          <Image className="w-auto h-6" src={SideIconPet} alt="" />
        </a>

        <button
          onClick={() => {
            showAdMenu ? setShowAdMenu(false) : setShowAdMenu(true)
          }}
          className={`" ${
            showAdMenu
              ? 'p-1.5 text-gray-500 bg-blue-100 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100'
              : 'p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100'
          }  "`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>

      {showAdMenu ? (
        <div className="h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
          <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">
            Administração
          </h2>

          <div className="mt-8 space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  onClick={() => setModalToOpen('create')}
                  className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none"
                >
                  <Image
                    className="object-cover w-8 h-8 rounded-full"
                    src={AddMoreIcon}
                    alt=""
                  />

                  <div className="text-left rtl:text-right">
                    <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">
                      Cadastro de Animais
                    </h1>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent>
                <CreatePetForm
                  modalToOpen={modalToOpen}
                  onSuccess={closeModal}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        ''
      )}
    </aside>
  )
}

export default SideBar
