import './hotel.css'
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import Email from "../../components/email/Email";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../components/reserve/Reserve';

const Hotel = () => {
 const location = useLocation();
 const id = location.pathname.split("/")[2];

 const [modalOpen, setModalOpen] =useState(false);
 const [sliderIndex, setSliderIndex] =useState(0);
 const [modal, setModal] = useState(false);

 const { data, loading, error} = useFetch(`/api/hotels/find/${id}`);
 const {dates, options} = useContext(SearchContext);
 const {user} = useContext(AuthContext);
 const navigate = useNavigate();
 
 const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
 function dayDifference(date1, date2) {
   const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
   const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
   return diffDays;
 }

 const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);
  // const images = [
  //   {
  //     src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/48243413.jpg?k=53d5521b511a925d8d9849d590a9a6d12c73988114e4db57bd26f7c56bfa4367&o=&hp=1"
  //   },
  //   {
  //     src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/49582492.jpg?k=1889ba19e61a4e11b88976d5caf31041a064f3cb2db205ef87f1658304325f68&o=&hp=1"
  //   },
  //   {
  //     src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/50231321.jpg?k=f95bf50954e92781cbb3b969d24a352d370cd482bcf73df7ea908b7251053cdc&o=&hp=1"
  //   },
  //   {
  //     src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/107588986.jpg?k=3e12844156a0922942b0202f7d1e947afc55a7883552778792248e61d7c91265&o=&hp=1"
  //   },
  //   {
  //     src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/50231440.jpg?k=bfce2807331341bdbcffaffa4bcce54ff5920881be63c4e950ce9126378abef1&o=&hp=1"
  //   },
  //   {
  //     src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/49581924.jpg?k=ccbfe1117b9f3162165c45c550795539f7878369e168cdf4d8d09635df169fc4&o=&hp=1"
  //   },
  // ]

  const handleOpen =(i) => {
    setSliderIndex(i);
    setModalOpen(true);
  }

  const handleSlide = (dir) => {
    let newSlideIndex;

    if(dir === "l" ){
      newSlideIndex =  sliderIndex === 0 ? 5 : sliderIndex-1;
    } else {
      newSlideIndex =  sliderIndex === 5 ? 0 : sliderIndex+1;
    }

    setSliderIndex(newSlideIndex);
  }

  const handleClick =() => {
     if(user) {
      setModal(true);

     }else {
      navigate('/login')
     }
  }
  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      {loading ? ("Loading") : (
      <>
       <div className="hotelContainer">
        {modalOpen && <div className="slider">
              <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=> setModalOpen(!modalOpen)}/>
              <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleSlide("l")}/>
              <div className="sliderWrapper">
                <img src={data.photos[sliderIndex]} alt="img" className="sliderImg" />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleSlide("r")}/>
        </div>}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve your appartments stay</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot}/>
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location - {data.distance}m from center
          </span>
          <span className="hotelPrice">
            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImg">
              {data.photos?.map((item,i) => (
                <div className="hotelImgWrapper">
                  <img src={item} alt="img" className='hotelpic' onClick={() => handleOpen(i)}/>
                </div>
              ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">
              {data.title}
              </h1>
              <p className="hotelDesc">
             {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Property Highlights</h1>
              <span>Located in the real heart of Paris, this property has an excellent location score of 8.4!</span>
              <h2><b>${days * data.cheapestPrice * options.room}</b> ({days} nights)</h2>
              <button onClick={handleClick}>Reserve</button>
            </div>
          </div>
        </div>
        <Email/>
        <Footer/>
      </div>
      </>
      )}
      {modal && 
      <Reserve setModal = {setModal} hotelId = {id}/>
      }
    </div>
  )
}

export default Hotel