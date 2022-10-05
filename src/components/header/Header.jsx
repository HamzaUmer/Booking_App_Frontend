import "./header.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faBed,   faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi } from "@fortawesome/free-solid-svg-icons"
import { DateRange } from 'react-date-range';
import { useContext, useState } from 'react';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";


const Header = ({type}) => {
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  const navigate = useNavigate()
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [openOption, setOpenOption] = useState(false);
  const [options, setOption] = useState({
    adult: 1,
    children:0,
    room: 1,
  })
  const {user} = useContext(AuthContext);

  const handleOption = (value, operation) => {
    setOption((prev) => {
      return {
        ...prev, [value]: operation === 'i' ? options[value] +1 : options[value] -1,
      };
    });
  };

  const {dispatch} = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({type: "NEW_SEARCH", payload:{destination,dates,options}})
      navigate("/hotels", {state: {destination,dates, options}})
  }

  return(
    <div className="header">
      <div className={type === 'list' ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
            <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
{ type !== "list" && 
<>
<h1 className="headerTitle">My definition of a good hotel is a place I'd stay at...</h1>
        <p className="headerDesc">Take room with 15% discount and enjoy your vacations with MHU Booking</p>
       {!user && <button className="headerBtn">Sign in / Register</button>}
        <div className="headerSearch">
          <div className="headerSearchItem">
          <FontAwesomeIcon icon={faBed} className="headerIcon" />
          <input type="text" placeholder="Where are you going?" className="headerSearchInput" onChange={e=> setDestination(e.target.value)}/>
          </div>
          <div className="headerSearchItem">
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
          <span onClick={()=> setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
          {openDate && <DateRange
           editableDateInputs={true}
          onChange={item => setDates([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dates}
          className="date"
          minDate = {new Date()}
            />}
          </div>
          <div className="headerSearchItem">
          <FontAwesomeIcon icon={faPerson} className="headerIcon" />
          <span onClick={() => setOpenOption(!openOption)} className="headerSearchText">{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
          {openOption && <div className="options">
            <div className="optionItem">
              <span className="optionText">Adult</span>
              <div className="optionCounter">
              <button className="optionCounterButton" disabled={options.adult <=1}  onClick={()=> handleOption("adult", "d")}>-</button>
              <span className="optionCounterNumber">{options.adult}</span>
              <button className="optionCounterButton" onClick={()=> handleOption("adult", "i")}>+</button>
              </div>
            </div>
            <div className="optionItem">
              <span className="optionText">Children</span>
              <div className="optionCounter">
              <button className="optionCounterButton" disabled={options.children <=1} onClick={()=> handleOption("childres", "d")}>-</button>
              <span className="optionCounterNumber">{options.children}</span>
              <button className="optionCounterButton" onClick={()=> handleOption("children", "i")}>+</button>
              </div>
            </div>
            <div className="optionItem">
              <span className="optionText">Room</span>
              <div className="optionCounter">
              <button className="optionCounterButton" disabled={options.room <=1}   onClick={()=> handleOption("room", "d")}>-</button>
              <span className="optionCounterNumber">{options.room}</span>
              <button className="optionCounterButton" onClick={()=> handleOption("room", "i")}>+</button>
              </div>
            </div>
          </div>}
          </div>
          <div className="headerSearchItem">
            <button className="headerBtn1" onClick={() => handleSearch()}>Search</button>
          </div>
        </div>
        </>
        }
        </div>
        </div>
  )
}

export default Header