import Email from "../../components/email/Email"
import Feature from "../../components/feature/Feature"
import FeatureList from "../../components/featureList/FeatureList"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import PropertyList from "../../components/propertyList/PropertyList"
import "./home.css"

const Home = () => (
  <div>
    <Navbar/>
    <Header/>
    <div className="homeContainer">
      <Feature/>
      <h1 className="homeTitle">Browse by property type</h1>
      <PropertyList/>
      <h1 className="homeTitle">Be our guests</h1>
      <FeatureList/>
      <Email/>
      <Footer/>
    </div>
  </div>
)

export default Home