import { ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Navbar.css'
import { RootState } from '../redux/store'
import { updateSearchTerm } from '../redux/searchSlice'

const Navbar = () => {
    const searchTerm = useSelector((state: RootState) => state.search.value)
    const dispatch = useDispatch()

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateSearchTerm(e.target.value))
    }

    return (
        <div className='Navbar'>
            <form>
                <input type="search" name="searchMovies" onChange={e => handleSearch(e)} />
            </form>
        </div>
    )
}   

export default Navbar