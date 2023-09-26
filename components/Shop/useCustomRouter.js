import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useCustomRouter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const addSearchParam = (title, value) => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    )
    currentParams.set(title, value)
    router.push(`${pathname}/?${currentParams}`)
  }
  const addMultiSearchParam = (params) => {
    //object of params
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    )
    const paramsArray = Object.entries(params)
    paramsArray.map((param) => {
      currentParams.set(param[0], param[1])
    })
    router.push(`${pathname}/?${currentParams}`)
  }
  const setSearchParam = (title, parameter) => {
    const currentParams = new URLSearchParams()
    currentParams.set(title, parameter)
    router.push(`${pathname}/?${currentParams}`)
  }
  return { addSearchParam, setSearchParam, addMultiSearchParam }
}
