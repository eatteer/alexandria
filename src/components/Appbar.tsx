type Props = {
  children: JSX.Element | JSX.Element[]
}

export const Appbar: React.FC<Props> = ({ children }) => {
  return (
    <nav
      className='
        sticky top-0 p-4
        w-full
        bg-white
        border-b border-slate-200
      '
    >
      {children}
    </nav>
  )
}
