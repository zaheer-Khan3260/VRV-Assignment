
import React, {useId, forwardRef} from 'react'


const Button = forwardRef(function({
  text,
  type = "text",
  ClassName= "",
  ...props
}, ref){
   const id = useId();

   return (
    <div className='w-full'>
    <button
    type={type}
    id={id}
    className = {`rounded-xl w-[10rem] h-11 py-2 px-3 text-gray-300 bg-blue-500 hover:bg-blue-700  leading-tight  ${ClassName} `}
    {...props}
    ref={ref}>
        {text}
    </button>
  </div>
   )
})


export default Button;