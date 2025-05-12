import React from 'react'
import './Message.css'

function Message({className,title, text,titleError,textError}) {
	

	if (className ==='validation-message') {
		return(
			<div className={className}>

				{(titleError)? <p className='validation-message__text validation-message__text--red'><sup>*</sup>{titleError}</p> : (title) && <p className='validation-message__text message--green'><sup>*</sup>{title}</p>}

				{(textError)? <p className='validation-message__text validation-message__text--red'><sup>*</sup>{textError}</p> : (text) && <p className='validation-message__text message--green'><sup>*</sup>{text}</p>}

			</div>
		)
	}

	if (className ==='loading-message') {
		return(
				<p className={className}>{text}</p>
		)
	}		
}

export default Message