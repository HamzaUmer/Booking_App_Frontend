import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import useFetch from '../../hooks/useFetch'
import './reserve.css'

const Reserve = ({setModal, hotelId}) => {
    const {data, error, loading} = useFetch(`/api/hotels/room/${hotelId}`);
    const [selectedroom, setSelectedRoom] = useState([]);
    const {dates} = useContext(SearchContext);
    const navigate = useNavigate()

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());

        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate()+1);
        }
        return dates;
    }

    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (rn) => {
        const isFound = rn.unavailableDates.some((date)=> 
        allDates.includes(new Date(date).getTime())
        );
        return !isFound;
    }

    const handleSelect= (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRoom(checked ? [...selectedroom,value] : selectedroom.filter((item) => item!== value))
    }

    const handleClick = async( )=> {
          try {
              await Promise.all(selectedroom.map((roomId)=> {
                      const res = axios.put(`/api/rooms/availability/${roomId}`, {dates:allDates});
                      return res.data;
              }));
              setModal(false);
              navigate("/");
          } catch (error) {
            console.log(error)
          }
    }

  return (
    <div className="reserve">
        <div className="reserveContainer">
            <FontAwesomeIcon icon={faCircleXmark} className="reserveClose" onClick={() => setModal(false)}/>
            <span>Select Your Room:</span>
            {data.map(item => (
                <div className="reserveItem" key={item._id}>
                    <div className="reserveInfo">
                        <div className="reserveTitle">{item.title}</div>
                        <div className="reserveDesc">{item.desc}</div>
                        <div className="reserveMax">Max people: <b>{item.maxPeople}</b></div>
                        <div className="reservePrice">{item.price}</div>
                    </div>
                    <div className="reserveSroom">
                        {item.roomNumbers.map(rn=> (
                             <div className="room" key={rn._id}>
                            <label>{rn.number}</label>
                             <input type="checkbox" value={rn._id} onChange={handleSelect} disabled={!isAvailable(rn)}/>
                    </div>
                    ))}
                    </div>
                </div>
            ))}
            <button className="reserveButton" onClick={handleClick}>Reserve Now!</button>
        </div>
    </div>
  )
}

export default Reserve