import React from 'react'
import './Post.css'
import Button from '../Button/Button'

function Post({
	post,
	onDelete,
}) {
	return (
		<div className='post'>
			{/* <p className='post__date'>20.05.2023 11:00</p> */}
			<p className='post__date'>{post.time}</p>
			<p className='post__title'>{post.title}</p>
			<p className='post__text'>{post.body}</p>

			<div className='post__row'>
				<Button 
					className='post__delete-btn' 
					text='Удалить пост'
					onClickDelete={onDelete}
				/>
			</div>
			
		</div>
	)
}

export default Post
