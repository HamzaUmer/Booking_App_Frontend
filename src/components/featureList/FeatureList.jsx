import useFetch from '../../hooks/useFetch';
import './featureList.css'

const FeatureList = () => {
    const { data, loading, error } = useFetch("/api/hotels?featured=true&limit=4");
  return (
    <div className="fl">
        {loading ? ("Loading") : (
        <>
      { data.map((item) => (
      <div className="flItems" key={item._id}>
        <img src={item.photos[0]} alt="img" className='flImg' />
        <span className='flName'>{item.name}</span>
        <span className='flCity'>{item.city}</span>
        <span className="flPrice">Starting from ${item.cheapestPrice}</span>
        {item.rating && <div className="flRating">
            <button>{item.rating}</button>
            <span>Good</span>
            </div>}
        </div> 
        ))}
        </>)}
    </div>
  )
}

export default FeatureList