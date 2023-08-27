import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Books() {
	const [books, setBooks] = useState([])

	useEffect(() => {
		const fetchAllBooks = async () => {
			try {
				const res = await axios.get(
					'https://book-crud-heroku-679d519b0481.herokuapp.com/books'
				)
				setBooks(res.data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchAllBooks()
	}, [])

	const handleDelete = async (id) => {
		try {
			await axios.delete(
				`https://book-crud-heroku-679d519b0481.herokuapp.com/books/${id}`
			)
			window.location.reload()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<h1>Haiqal Book Store</h1>
			<div className='books'>
				{books.map((book) => (
					<div className='book' key={book.id}>
						{book.cover && <img src={book.cover} alt='' />}
						<h2>{book.title}</h2>
						<p>{book.description}</p>
						<span>{book.price}</span>
						<button className='delete' onClick={() => handleDelete(book.id)}>
							Delete
						</button>
						<button className='update'>
							<Link to={`update/${book.id}`}>Update</Link>
						</button>
					</div>
				))}
			</div>
			<button>
				<Link to='/add'>Add new book</Link>
			</button>
		</div>
	)
}
export default Books
