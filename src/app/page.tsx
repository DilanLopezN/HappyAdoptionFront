import PetsList from '@/components/PetsList'
import SideBar from '@/components/SideBar'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="h-full w-auto ">
        <SideBar />
      </div>
      <div className="flex flex-col w-[1248px] h-full ">
        <div className="m-4 bg-gray-200 shadow-md w-full h-full rounded-md overflow-y-auto">
          <PetsList />
        </div>
      </div>
    </main>
  )
}
