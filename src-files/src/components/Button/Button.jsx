import React from 'react'
import './Button.css'

function Button({className,text,disabled,onClickDelete}) {
  
  return (

			<button
				className={className}
				disabled={disabled}
				onClick={onClickDelete} >
				{text}
			</button>

  )
}

export default Button
