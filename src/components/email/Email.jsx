import "./email.css"

const Email = () => {
  return (
    <div className="email">
        <h1 className="emailTitle">
            Save time , save money!
        </h1>
        <span className="emailDesc">Sign up and we'll send the best deals to you</span>
        <div className="emailInputContainer">
            <input type="text" placeholder="Your Email" />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default Email