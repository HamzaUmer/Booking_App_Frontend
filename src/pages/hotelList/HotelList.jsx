import './hotelList.css'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import SearchItem from '../../components/searchItem/SearchItem'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { format } from 'date-fns';
import { DateRange } from 'react-date-range'
import useFetch from '../../hooks/useFetch'

const HotelList = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOption] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { data, loading, error, refetchData } = useFetch(`/api/hotels?city=${destination}&min=${min || 0}&max=${max|| 777}`);

  const handleClick=() => {
       refetchData();
  }
  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="listTitle">
              Search
            </h1>
            <div className="listItem">
              <label>Destination</label>
              <input type="text" placeholder={destination}/>
            </div>
            <div className="listItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
               {openDate && <DateRange
                onChange = {(item) => setDates([item.selection])}
                minDate = {new Date()}
                ranges={dates}
                />}
            </div>
            <div className="listItem">
              <label>Options</label>
              <div className="listOptions">
              <div className="listSearchOptionItem">
                <span className="listSearchOptionText">
                  Min price <small>per night</small>
                </span>
                <input type="number" onChange={e=> setMin(e.target.value)} className="listSearcInput" />
              </div>
              <div className="listSearchOptionItem">
                <span className="listSearchOptionText">
                  Max price <small>per night</small>
                </span>
                <input type="number" onChange={e=> setMax(e.target.value)} className="listSearcInput" />
              </div>
              <div className="listSearchOptionItem">
                <span className="listSearchOptionText">
                  Adult
                </span>
                <input type="number" min={1} className="listSearcInput" placeholder={options.adult}/>
              </div>
              <div className="listSearchOptionItem">
                <span className="listSearchOptionText">
                  Children
                </span>
                <input type="number" min={0}  className="listSearcInput" placeholder={options.children}/>
              </div>
              <div className="listSearchOptionItem">
                <span className="listSearchOptionText">
                  Room
                </span>
                <input type="number" min={1}  className="listSearcInput" placeholder={options.room}/>
              </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? "Loading" : 
            <>
            {data.map((item)=> (
              <SearchItem key={item._id} item={item}/>
              ))}
            </>
            }
          </div>
        </div>
      </div>
      </div>
  )
}

export default HotelList