'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { useToast } from './ui/use-toast'
type PetsDto = {
  id: number
  name: string
  description: string
  urlImage: string
  category: string
  birthDay: Date
  status: string
}

export default function PetsList() {
  const [dogRandom, setDogRandom] = useState('')
  const [petsList, setPetsList] = useState<PetsDto[]>([])
  const [showAdopted, setShowAdopted] = useState(false)

  const { toast } = useToast()
  async function loadRandomDog() {
    const res = await axios.get('https://random.dog/woof.json?include=jpg,gif')
    setDogRandom(res.data.url)
  }

  async function loadPetsData() {
    const res = await axios.get('http://localhost:8080/api/animais')
    setPetsList(res.data)
  }

  async function handleChangeStatus(status: string, id: string) {
    try {
      await axios.put(
        `http://localhost:8080/api/animais/${id}/status?status=${
          status == 'DISPONIVEL' ? 'ADOTADO' : 'DISPONIVEL'
        }`
      )
      loadPetsData()
    } catch (error) {
      toast({ title: 'Falha ao alterar status' })
    }
  }

  useEffect(() => {
    loadRandomDog()
    loadPetsData()
  }, [])

  const filteredPets = petsList.length
    ? petsList.filter(pet =>
        showAdopted
          ? pet.status === 'ADOTADO'
          : pet.status === 'DISPONIVEL' || pet.status === 'ADOTADO'
      )
    : [
        {
          id: 1,
          name: 'Exemplo',
          birthDay: new Date(),
          urlImage: dogRandom,
          description: 'Exemplo pet adoção',
          status: 'DISPONÍVEL',
          category: 'Não definido'
        }
      ]

  {
    /*
          Melhorias a serem feitas:
          Fluxo de renderização da tela,
          Retirar useEffect utilizar o próprio NextJs ou ReactQuery,
          Cacheamento das Requisições,
          Atualização da lista conforme alterações no back-end
        */
  }

  return (
    <div className="bg-white w-full h-full">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Animais para adoção!
        </h2>

        <div className="mt-4">
          <label className="text-sm text-gray-700 flex items-center">
            <input
              type="checkbox"
              checked={showAdopted}
              onChange={() => setShowAdopted(prev => !prev)}
              className="mr-2"
            />
            Ver adotados
          </label>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredPets.map(pet => (
            <div
              key={pet.id}
              className="flex flex-col bg-gray-200 shadow-md rounded-sm p-4"
            >
              <img
                alt={pet.name}
                src={pet.urlImage}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
              <div className="flex items-center justify-between mt-2 h-[128px]">
                <div className="flex flex-col">
                  <h3 className="text-gray-800 font-medium">{pet.name}</h3>
                  <span className="mt-1">{pet.category}</span>
                </div>
                <div className="flex flex-col justify-center ml-4">
                  <h4 className="flex items-center gap-2">
                    Status:{' '}
                    <span
                      className={`${
                        pet.status == 'DISPONIVEL'
                          ? 'text-green-600 font-bold'
                          : ' text-yellow-600 font-bold'
                      }`}
                    >
                      {pet.status}
                    </span>
                  </h4>

                  <button
                    onClick={() =>
                      handleChangeStatus(pet.status, pet.id.toString())
                    }
                    className="rounded-md p-1 bg-blue-400 text-white hover:bg-blue-300 "
                  >
                    Alterar status
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
