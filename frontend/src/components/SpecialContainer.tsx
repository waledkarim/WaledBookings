
type Props = {
    onClose?: () => void,
    open?: boolean,
    children?: React.ReactNode,
}

const SpecialContainer = ({onClose, open = false, children}: Props) => {
    return (
      <div onClick={onClose} className={`
        fixed 
        max-w-screen-2xl 
        m-0 
        left-0 
        right-0 
        top-0 
        h-screen 
        z-50 
        bg-black/20
        transition-opacity
        duration-300
        ease-in-out
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}> 
  
              <div>
                  { children }
              </div>
  
      </div>
    )
  }
  
  export default SpecialContainer;