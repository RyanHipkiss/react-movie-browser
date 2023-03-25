import './App.css'
import useMovies from './hooks/useMovies'

function App() {
  const { movies, moviesError } = useMovies()
  return (
    <h1>Hello</h1>
  )
}

export default App
