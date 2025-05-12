import React,
	{useState,
	useEffect
	}
 from 'react'

import { getPosts, deletePost, addPost } from './api/post'
import { getNumber, setNumber } from './api/storage'
import { getNormalizedPosts } from './utils/get-normalized-posts'
import {getDatePost} from './utils/get-post-date'
import './App.css'

import Input from './components/Input/Input'
import Textarea from './components/Textarea/Textarea'
import Button from './components/Button/Button'
import Message from './components/Message/Message'
import Heading from './components/Heading/Heading'
import Post from './components/Post/Post'
import {v4 as uuidv4} from 'uuid'



const EMPTY_STRING = '';
const INIT_TITLE_STRING ='Поле заголовка поста не может быть пустым.';
const INIT_TEXT_STRING ='Поле текста поста не может быть пустым.';
const TITLE_ERROR_STRING ='Заголовок поста не должен быть больше 20 символов!';
const TEXT_ERROR_STRING ='Текст поста не должен быть больше 30 символов!';
const LOCAL_STORAGE_STRING = 'quantity';

function App() {

	const [postsNumber, setPostsNumber] = useState(localStorage.getItem(LOCAL_STORAGE_STRING) ? JSON.parse(getNumber(LOCAL_STORAGE_STRING)) : 5);
	setNumber(LOCAL_STORAGE_STRING, postsNumber);


	const [postsIds, setpostsIds] = useState(null);
	const [postsById, setpostsById] = useState({});
	const [isPostsLoading, setIsPostsLoading] = useState(false);
	const [isErrorLoading, setIsErrorLoading] = useState(false);
	const [isTitle, setIsTitle] = useState(INIT_TITLE_STRING);
	const [isText, setIsText] = useState(INIT_TEXT_STRING);
	const [isErrorTitle, setIsErrorTitle] = useState(EMPTY_STRING);
	const [isErrorText, setIsErrorText] = useState(EMPTY_STRING);
	const [isValidationTitle, setIsValidationTitle] = useState(false);
	const [isValidationText, setIsValidationText] = useState(false);
	const [postValid, setPostValid] = useState(false);

	const [post, setPost] = useState({
		title: '',
		text: '',
		time: '',
		id: ''
	});

	//console.log('component rendered');

	useEffect(() => {
		setIsErrorLoading(false);
		setIsPostsLoading(true);
		
	getPosts(postsNumber)
		.then(data => {
						console.log(data.posts);
						const posts = data.posts;
						
					const[ids, byIds] = getNormalizedPosts(posts);

						setIsPostsLoading(false);
						setpostsIds(ids);
						setpostsById(byIds);
						console.log(byIds);
					})
			
				.catch(() => {
						setIsErrorLoading(true);
						setIsPostsLoading(false);
				});

	}, [ postsNumber]);

	function heandleDeletePost(id) {
			if (postsIds.length === 1){
				setpostsIds(postsIds.filter((postId) => postId !== id));
				deletePost(id);
				setIsPostsLoading(true);
				return;
			}
			setpostsIds(postsIds.filter((postId) => postId !== id));
			deletePost(id);
	}

	function handleInputPostChange(e) {

			if (e.target.name === 'title') {
		 	setPost({
			...post,
				[e.target.name]: e.target.value
			});
			
			if (e.target.value.trim() === '') {
				console.log('=-=');
				setIsErrorTitle(EMPTY_STRING);
				setIsTitle(INIT_TITLE_STRING);
				setIsValidationTitle(false);
			}else{
					if ( e.target.value.length <1 || e.target.value.length >20  ) {
						setIsErrorTitle(TITLE_ERROR_STRING);
						setIsValidationTitle(false);
					} else {
							setIsTitle(EMPTY_STRING);
							setIsErrorTitle(EMPTY_STRING);
							setIsValidationTitle(true);
					}
			}
					 return;
		} 


		if (e.target.name === 'text') {
		 	setPost({
			...post,
				[e.target.name]: e.target.value
			});

			if (e.target.value.trim() === '') {
				console.log('=-=');
				setIsErrorText(EMPTY_STRING);
				setIsText(INIT_TEXT_STRING);
				setIsValidationText(false);
			} else{
					if (e.target.value.length <1 || e.target.value.length >30) {
						setIsErrorText(TEXT_ERROR_STRING);
						setIsValidationText(false);
					} else {
						setIsText(EMPTY_STRING);
						setIsErrorText(EMPTY_STRING);
						setIsValidationText(true);
					}
			}
					 return;
		} 

	}

	function handleSubmitNewPost(e) {
		e.preventDefault();
		//console.log(post);

		const id = uuidv4();
		const currentDate = new Date();
		const postData = getDatePost(currentDate);

		const newPost ={
			title: post.title,
			body: post.text,
			time: postData,
			id: id,
			userId: 1
		};

		setpostsById({
			...postsById,
				[newPost.id]: newPost
		});

		setpostsIds([newPost.id, ...postsIds]);

		addPost(newPost);
		/////////////////////////
		
			// обнуление полей формы
			setIsTitle(INIT_TITLE_STRING);
			setIsText(INIT_TEXT_STRING);
			setIsValidationTitle(false);
			setIsValidationText(false);
			
			setPost({
				title: '',
				text: '',
				time: ''
			});
			
			//console.log(newPost);
	}
	
	useEffect ( () => {

		if (!isValidationTitle || !isValidationText) {
			setPostValid(false);
		} else{
			setPostValid(true);
		}

	},[isValidationTitle, isValidationText]);

function handlePostsChange(e) {
	setPostsNumber(e.target.value);
	//localStorage.setItem('quantity', JSON.stringify(postsNumber));
	setNumber(LOCAL_STORAGE_STRING, postsNumber);
 }



  return (

	   <>
			<div className='blog'>
				<div className='container'> 
					<h1 className="blog__title">Приложение БЛОГ</h1>

					<div className='row'>
						<div className='form-wrapper col'>
							<form className='form' onSubmit={handleSubmitNewPost}> 
								<Heading
									className='col__title'
									level='h1'
									text='Новый пост' />

								<Input
									className='form__input'
									type='text'
									name='title'
									value={post.title}
									placeholder='Заголовок'
									onChange={handleInputPostChange} />

									<Textarea
										className='form__textarea'
										type='text'
										name='text'
										value={post.text}
										placeholder='Текст'
										onChange={handleInputPostChange} />
									
									<Button
										type="submit"
										className='post__add-btn' 
										text='Опубликовать'
										disabled={!postValid} />
												
									<Message
										className='validation-message' 
										titleError={isErrorTitle}
										title={isTitle}
										textError={isErrorText} 
										text={isText} />

								</form>
						</div>
						
						<div className='post-wrapper col'>
							<Heading
								className='col__title'
								level='h2'
								text='Лента' />

							<hr />

							<label className='posts__quantity' htmlFor="posts">Выберите количество постов в ленте: </label>
							<select id="posts" name="number"
								onChange={handlePostsChange}
								value={postsNumber} >

								<option value="5">5</option>
								<option value="10">10</option>
								<option value="15">15</option>
								<option value="50">50</option>

							</select>

							<hr />

							<div className='posts'>

								{isErrorLoading && <Message
									className='loading-message' 
									text='Произошла ошибка' />}

								{isPostsLoading && <Message
									className='loading-message' 
									text='Тут пока пусто...' />}

								{postsIds && postsIds.map(id => (
									
									<Post
										key={id} 
										post={postsById[id]}
										onDelete={() => heandleDeletePost(id)} />

									))}

							</div>
						</div>
					</div>
					
				</div>
			</div>
    </>

  )
}

export default App

