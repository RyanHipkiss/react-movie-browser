import useSWR from 'swr'
import fetcher from './fetcher'

const usePromo = () => {
    const { data, error } = useSWR('http://localhost:3001/promo', fetcher)

    return {
        promo: data, 
        promoError: error 
    }
}

export default usePromo