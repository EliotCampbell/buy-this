import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useCustomRouter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const addSearchParam = (title, value) => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    )
    currentParams.set('page', '1')
    currentParams.set(title, value)
    router.push(`${pathname}/?${currentParams}`)
  }
  const addMultiSearchParam = (params) => {
    //object of params
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    )
    currentParams.set('page', '1')
    const paramsArray = Object.entries(params)
    paramsArray.map((param) => {
      currentParams.set(param[0], param[1])
    })
    router.push(`${pathname}/?${currentParams}`)
  }
  const setSearchParam = (title, parameter) => {
    const currentParams = new URLSearchParams()
    currentParams.set('page', '1')
    currentParams.set(title, parameter)
    router.push(`${pathname}/?${currentParams}`)
  }
  const removeSearchParam = (title) => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    )
    currentParams.delete(title)
    router.push(`${pathname}/?${currentParams}`)
  }
  return {
    addSearchParam,
    setSearchParam,
    addMultiSearchParam,
    removeSearchParam
  }
}
