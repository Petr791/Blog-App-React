import React from 'react'
import './Heading.css'

function Heading(props) {

	if (props.level ==='h1') {
		return(
				<h1 className={props.className}>{props.text}</h1>
		)
	}

	if (props.level ==='h2' && props.className ==='col__title') {
		return(
				<h2 className={props.className}>{props.text}</h2>
		)
	}

}

export default Heading
