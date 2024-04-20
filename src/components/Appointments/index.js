import {Component} from "react"

import AppointmentsItem from "../AppointmentsItem"

import {v4 as uuidv4} from "uuid"

import "./index.css"

class Appointments extends Component{
    state={title:"",date:"",filter:false,appointmentsLits:[]}

    enterTitle=(event)=>{
      this.setState(prevState=>({...prevState,title:event.target.value}))
    }

    enterDate=(event)=>{
      this.setState(prevState=>({...prevState,date:event.target.value}))
    }

    addAppointment=(event)=>{
      event.preventDefault()
      const {title,date}=this.state
      if(title !== "" && date !==""){
        const newAppointment={
          id:uuidv4(),
          title,
          date,
          star:false
        }
        this.setState(prevState=>({title:"",date:"",filter:false,appointmentsLits:[...prevState.appointmentsLits,newAppointment]}))
      
      }else{
        window.alert("Enter Proper Details")
      }
    }

    onStar=(id)=>{
      const {appointmentsLits}=this.state
      const resultsList=appointmentsLits.map(each=>{
        if(each.id===id){
          return {...each,star:!each.star}
        }else{
          return each
        }
      })
      this.setState(prevState=>({...prevState,appointmentsLits:resultsList}))
    }
    
    filterTheAppointments=()=>{
      this.setState(prevState=>({...prevState,filter:!prevState.filter}))
    }

    filterList=()=>{
      const {filter,appointmentsLits}=this.state
      if(filter){
        return appointmentsLits.filter(each=>each.star===true)
      }
      return appointmentsLits
    }

    blur=(event)=>{
      const ele=document.querySelector(`.${event.target.id}`)
      if(event.target.value===""){
        ele.classList.remove("checked")
      }else{
        ele.classList.add("checked")
      }

    }

    render(){
        const {title,date,filter}=this.state
        const filterList=this.filterList()

        return(
          <div className="appointments-container">
            <div className="appointments-container__card-container">
              <div className="card-container__container">
               <div className="container__appointment-form-img-container">
                  <div className="appointment-form-img-container__form-container">
                    <h1 className="form-container__heading">Add Appointments</h1>
                    <form className="form-container__container" onSubmit={this.addAppointment}>
                      <div className="container__title-container">
                        <label htmlFor="title" className="title-lable">TITLE</label>
                        <input onBlur={this.blur} required id="title" placeholder="Title" value={title} className="title-input" onChange={this.enterTitle}/>
                        <p className="title checked">*Required</p>
                      </div>
                      <div className="container__title-container">
                        <label htmlFor="date" className="title-lable">DATE</label>
                        <input onBlur={this.blur}  required type="date" id="date" placeholder="dd/mm/yyyy" value={date} className="title-input" onChange={this.enterDate}/>
                        <p className="date checked">*Required</p>
                      </div>
                      <button type="submit" className="submit-btn">Add</button>
                    </form>
                  </div>
                  <img src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png" alt="appointments" className="appointment-form-img-container__img"/>
               </div>
               <hr/>
               <div className="card-container__container__appointments-list-container">
                <div className="appointments-list-container__first-container">
                  <p className="first-container__text">Appointments</p>
                  <button type="button" className={`stared-btn ${filter ? "filter-class":""}`} onClick={this.filterTheAppointments}>stared</button>
                </div>
                <ul className="appointments-list-container__list-container">
                  {filterList.map(each=>
                  < AppointmentsItem  onStar={this.onStar} eachAppointment={each} key={each.id}/>)}
                </ul>
               </div>
              </div>
            </div>
          </div>

        )
    }

}

export default Appointments

