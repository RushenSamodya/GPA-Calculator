import { useAuthContext } from './useAuthContext'
import { useModulesContext } from './useModulesContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchModules} = useModulesContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchModules({ type: 'SET_MODULES', payload: null })
  }

  return { logout }
}