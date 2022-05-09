import { useSelector } from 'react-redux'

type Props = {
  children: JSX.Element
}

export const RequireAuth: React.FC<Props> = ({ children }) => {
  const user = useSelector<any, any>((store) => store.user)
  return <>{user && children}</>
}
