import usePromo from "../hooks/usePromo"
import './Promo.css'
const Promo = () => {
    const { promo, promoError } = usePromo()

    if (promoError) {
        return <>{promoError}</>
    }

    return (
        <div className='Promo' style={{
            backgroundImage: `url(${promo?.image})`
        }}>
            <div className='Info'>
                <h1 className='Title'>{promo?.title}</h1>
                <h2 className='Genre'>{promo?.genre}</h2>
            </div>
        </div>
   )
}

export default Promo