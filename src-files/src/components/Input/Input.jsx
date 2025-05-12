import React from 'react'
import './Input.css'

function Input(props) {
 // console.log(props)
	return (

			<input 
				className={props.className}
				type={props.type}
				name={props.name}
				value={props.value}
				placeholder={props.placeholder}
				onChange={props.onChange}
			/>

  )
}

export default Input
