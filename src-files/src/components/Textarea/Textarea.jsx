import React from 'react'
import './Textarea.css'

function Textarea(props) {
	
	return (
		<>
			<textarea
				className={props.className}
				type={props.type}
				name={props.name}
				value={props.value}
				placeholder={props.placeholder}
				onChange={props.onChange}
			/>
			
		</>


  )
}

export default Textarea
