import useSWR from 'swr'
import fetcher from './fetcher'

const useMovies = () => {
    const { data, error } = useSWR('http://localhost:3001/movies', fetcher)
    
    return {
        movies: data, 
        moviesError: error
    }
}

export default useMovies