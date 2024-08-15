'use client'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useToast } from './ui/use-toast'
type CadModalProps = {
  modalToOpen: string
  onSuccess: () => void
}
export default function CreatePetForm({
  modalToOpen,
  onSuccess
}: CadModalProps) {
  const { toast } = useToast()
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    description: Yup.string().required('Descrição é obrigatória'),
    urlImage: Yup.string()
      .url('URL da imagem inválida')
      .required('URL da imagem é obrigatória'),
    category: Yup.string().required('Categoria é obrigatória'),
    birthDay: Yup.date()
      .required('Data de nascimento é obrigatória')
      .typeError('Data de nascimento inválida'),
    status: Yup.string()
      .oneOf(['DISPONIVEL', 'ADOTADO'], 'Status inválido')
      .required('Status é obrigatório')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async (data: any) => {
    try {
      const response = await axios
        .post('http://localhost:8080/api/animais', data)
        .catch(err => {
          throw err
        })

      toast({
        title: 'Cadastro realizado com sucesso!'
      })
      if (response.status == 200) {
        onSuccess()
      }
    } catch (error) {
      toast({
        title: 'Falha ao Realizar cadastro',
        description: `Erro`
      })
    }
  }

  let CadRenderModal
  switch (true) {
    case modalToOpen === 'create':
      // SEPARAR EM COMPONENTE
      CadRenderModal = (
        <div className="w-full h-full p-8 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Cadastro de Pet</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                placeholder="Nome do Animal"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                  errors.name ? 'border-red-500' : ''
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Descrição
              </label>
              <textarea
                id="description"
                {...register('description')}
                rows={4}
                placeholder="Descrição do Animal"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                  errors.description ? 'border-red-500' : ''
                }`}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="urlImage"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                URL da Imagem
              </label>
              <input
                type="text"
                id="urlImage"
                {...register('urlImage')}
                placeholder="https://exemplo.com/imagem.jpg"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                  errors.urlImage ? 'border-red-500' : ''
                }`}
              />
              {errors.urlImage && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.urlImage.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Categoria
              </label>
              <input
                type="text"
                id="category"
                {...register('category')}
                placeholder="Ex: Gatos ou Cachorros"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                  errors.category ? 'border-red-500' : ''
                }`}
              />
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="birthDay"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Data de Nascimento
              </label>
              <input
                type="date"
                id="birthDay"
                {...register('birthDay')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                  errors.birthDay ? 'border-red-500' : ''
                }`}
              />
              {errors.birthDay && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.birthDay.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="status"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Status
              </label>
              <select
                id="status"
                {...register('status')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                  errors.status ? 'border-red-500' : ''
                }`}
              >
                <option value="DISPONIVEL">Disponível</option>
                <option value="ADOTADO">Adotado</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Cadastrar Pet
            </button>
          </form>
        </div>
      )
      break
    default:
      break
  }

  return CadRenderModal
}
