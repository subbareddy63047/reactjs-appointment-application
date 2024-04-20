import "./index.css"

const AppointmentsItem=(props)=>{
  const {eachAppointment,onStar}=props
  const {title,date,star,id}=eachAppointment
  const clickedStar=()=>{
    onStar(id)
  }

  return (<li className="each-appointment">
          <div className="each-appointment__name-container">
            <p className="name">{title}</p>
            <button type="button" className="star-btn" onClick={clickedStar}><img src={`${star ?"https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
            :"https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png" }`} 
            alt="star-img" className="star-img"/> </button>
          </div>
          <p className="date-for-Item">Date:{date}</p>
    </li>)
}
export default AppointmentsItem