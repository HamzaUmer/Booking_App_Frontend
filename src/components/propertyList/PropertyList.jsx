import useFetch from '../../hooks/useFetch';
import './propertyList.css'

const PropertyList = () => {
  const { data, loading, error } = useFetch("/api/hotels/countByType");
  const photos = [
    "https://www.idealtrip.net/wp-content/uploads/2022/02/hotel-ideal-trip.jpg",
    "https://www.aveliving.com/AVE/media/Property_Images/Florham%20Park/hero/flor-apt-living-(2)-hero.jpg?ext=.jpg",
    "http://cdn.cnn.com/cnnnext/dam/assets/220113024948-15-new-maldives-resorts-2022.jpg",
    "https://e8rbh6por3n.exactdn.com/sites/uploads/2020/05/villa-la-gi-thumbnail.jpg?strip=all&lossy=1&ssl=1",
    "https://l.icdbcdn.com/oh/1590372f-bf7b-4379-b7e5-4b333cff911a.jpg" 
  ]
  return (
    <div className="list">
     {loading ? ("Loading") : (<>
     {data && photos.map((item,i) => (
     <div className="listItem" key={i}>
        <img src={item} alt="madrid" className='listImg' />
        <div className="listTitles">
          <h1>{data[i]?.type}</h1>
          <h2>{data[i]?.count}  {data[i]?.type}</h2>
        </div>
      </div>
      ))}
    </>
    )}
    </div>
  )
}

export default PropertyList