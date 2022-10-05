import useFetch from '../../hooks/useFetch'
import './feature.css'

const Feature = () => {
  const { data, loading, error } = useFetch("/api/hotels/countByCity?cities=Edinburgh,Swat,Turkey");
  return (
    <div className="featured">
      {loading ? "Loading please Wait" : <><div className="featuredItem">
        <img src="https://images.unsplash.com/photo-1557113940-2ac14087c5c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZWRpbmJ1cmdoJTIwY2l0eXxlbnwwfHwwfHw%3D&w=1000&q=80" alt="edinburgh" className='featuredImg' />
        <div className="featuredTitles">
          <h1>Edinburgh</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="https://images.unsplash.com/photo-1494949360228-4e9bde560065?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGhhaWxhbmQlMjB0cmF2ZWx8ZW58MHx8MHx8&w=1000&q=80" alt="thailand" className='featuredImg' />
        <div className="featuredTitles">
          <h1>Swat</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="https://images.unsplash.com/photo-1619965342156-8e28c92028e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGlzdGFuYnVsfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="turkey" className='featuredImg' />
        <div className="featuredTitles">
          <h1>Turkey</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div> </>}
    </div>
  )
}

export default Feature