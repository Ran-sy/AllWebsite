import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/dist";
import "./Profile.css";
import { mentor4 } from "../../assets";
import { useParams } from "react-router-dom/dist";
import CalendarDays from "./calender-days";
import { useSelector } from "react-redux";
import { Localhost } from "../../config/api";
import { Error, Success } from '../../components/Toast';
import axios from "axios";


function Profile() {
  axios.defaults.withCredentials = true;
  const user = useSelector(state => state.currentUser);
  const userRole = user?.role === 'mentee'
  const { id } = useParams();
  const [guestProfile, setGuestProfile] = useState('');
  const [profile, setProfile] = useState({
    user: {name: '', email: ''},
    designation: '',
    avatar:  '', 
    role: 'mentee', 
    currentCompany: '', 
    university: '', 
    phone: '011', 
    availableForHiring: true, 
    about: 'sixteen free code camp', 
    expertise: [{name: '', from: '', to: ''}], 
    skills: [] });
  const [senderInfo, setSenderInfo] = useState([]);
  const [messages, setMessages] = useState([]);
  const [msgContent, setMsgContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [msgBtnClicked, setMsgBtnClicked] = useState(true);
  const [broughtOnce, setBroughtOnce] = useState(false)
  const [value, onChange] = useState(new Date());
  const [calendardate,setCalendarDate]=useState();

  useEffect(() => {
    const getProfile = async() => {
      if(!broughtOnce){
      try{
        const res = await axios.get(`${Localhost}/api/v1/mentorProfile/user/${id}`);
        const guestRes = await axios.get(`${Localhost}/api/v1/mentorProfile/user/${user?._id}`);
        const getMessages = await axios.get(`${Localhost}/api/v1/message/receiver/${id}`);
        getMessages?.data?.forEach(async msg=>{
          const sender = await axios.get(`${Localhost}/api/auth/user/${msg.sender}`)
          setSenderInfo(sender?.data)
          setMessages([
            ...messages, {
              id: messages.length, 
              name: sender?.data?.name || 'Unknown', 
              avatar: sender?.data?.avatar || "https://image.lexica.art/md2/37d7fb15-eed3-472b-bbae-57240a15704a",
              messageContent: msg?.messageContent || 'none'
            }])
        })

        setGuestProfile(guestRes?.data);
        setProfile(res?.data);
        setMessages(getMessages?.data)

        setBroughtOnce(true)
      }catch(e){
        console.log(e)
        Error(e.message)
      }}
    }
    getProfile()
  }, []);

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

      const [date,setDate] = useState({currentDay:new Date()})
   
 const changeCurrentDay = (day) => {
    setDate({ currentDay: new Date(day.year, day.month, day.number) });
  };

  const handleSend = () => {
    // Create a new message object with the desired values
    const newMessage = {
      id: messages.length,
      name: guestProfile?.name || "Unknown",
      avatar: guestProfile?.avatar ,
      messageContent: msgContent || "...",
    };
    setMessages([...messages, newMessage]);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter the messages based on the search term
  const filteredMessages = messages.filter((message) =>
    message.messageContent.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // connect message to back
  const handleMessage = async (e)=>{
    e.preventDefault();
    await axios.post(`${Localhost}/api/v1/message/${id}` ,{
      messageContent: msgContent,
    })
    .then(() =>{
      Success('Message sended')
      handleSend();
      setMsgBtnClicked(false);
    })
    .catch((error)=>{Error(error.message); console.log(e)})
  }

  return (
    <div className="container-xl">
      <div className="row" style={{ marginTop: "8%" }}>
        <div className="col-lg-3 col-md-2">
          <div className="d-lg-block d-sm-none" style={{ lineHeight: "35px" }}>
            <ul className="list-group list-unstyled">
              <li className="list-item">
                <Link to = {'/edituser/'+user?._id} >Edit Profile</Link>
              </li>
              <li className="list-item">
                <Link to= {'/edituser/'+user?._id} >Settings</Link>
              </li>
              <li className="list-item">
                <Link to="">Terms and Privacys</Link>
              </li>
            </ul>
            <h5 className="">
              {userRole ? (
                <Link to= "/mentorreqapp" >My Requests</Link>
              ) : (
                <Link to= "/mentoroppapp" >My Oppourtunities</Link>
              )}
            </h5>
            <Link to = {userRole ? "/PostRequest" : "/PostOpp"} >
              <button className="bg-none">
                {userRole ? "Post a new Requests" : "Post a new Oppourtunity"}
                <i className="fa fa-plus"
                style={{ color: "white", backgroundColor: "#007580", fontSize: "10px", padding: "5px", marginLeft: "5px", }}
                ></i>
              </button>
            </Link>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="--profile-head rounded">
            <div className="d-flex flex-column flex-wrap justify-content-center align-items-end p-2">
              <button className="btn btn-warning rounded-pill">Message</button>
            </div>
            <div className="--profile-body d-flex flex-column flex-wrap justify-content-center align-items-center">
              <img src={profile?.avatar} alt="userImage" className="w-25 h-25 rounded-circle" />
              <h4 className="fs-5 pt-4">{ profile?.user?.name }</h4>
              <h5 className="fs-6 p-1">{ profile?.designation }</h5>
              <span className="text-white text-uppercase">{ profile?.role }</span>
            </div>
            <div className="--inner-icons d-lg-none d-sm-flex justify-content-end align-items-end gap-2">
              <span>
                <i className="fa-solid fa-envelope fs-3"></i>
              </span>
              <span>
                <i className="fa-solid fa-calendar-days fs-3 pe-2"></i>
              </span>
            </div>
          </div>
          <div className="--personal-info mt-4">
            <div className="d-flex flex-row gap-4">
              <h3 className="border-bottom border-warning fs-6">Personal Information</h3>
              <h3 className="fs-6">Addiontional Information</h3>
            </div>
            <div className="p-3 rounded" style={{ backgroundColor: "#f7f7f7" }}>
              <div className="d-flex">
                <div className="col">
                  <div>
                    <label htmlFor="name" style={{ color: "#007580" }}>Name</label>
                    <br />
                    <span>{ profile?.user?.name }</span>
                  </div>
                    <div>
                      <label htmlFor="name" style={{ color: "#007580" }}> JobTitle </label>
                      <br />
                      <span>{ profile?.designation }</span>
                    </div>
                  {userRole ? (
                    <div>
                      <label htmlFor="company" style={{ color: "#007580" }}>Company</label>
                      <br />
                      <span>{ profile?.currentCompany }</span>
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="unviersity" style={{ color: "#007580" }}>
                        Unviersity
                      </label>
                      <br />
                      <span>{ profile?.unirversity }</span>
                    </div>
                  )}
                </div>
                <div className="col">
                  <div>
                    <label htmlFor="phone" style={{ color: "#007580" }}>Phone Number:</label>
                    <br />
                    <span>{ profile?.phone }</span>
                  </div>
                  <div>
                    <label htmlFor="email" style={{ color: "#007580" }}>Email</label>
                    <br />
                    <span>{profile?.user?.email || "Balquees@gmail.com"}</span>
                  </div>
                  {userRole ? ("") : (
                    <div className="mt-3">
                      <span className="bg-warning text-white p-2 rounded-pill">
                        JOB SEEKER{" "}
                        { profile?.availableForHiring 
                        ?<i className="fa-solid fa-exclamation --icon-not"></i>
                        :("") }
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <p className="" style={{ fontSize: "15px", marginTop: "5%" }}>
                { profile?.about || "Lorem Ipsum has been the industry's standard dummy text ever"}
              </p>
              <div className="--user-exp">
                <h5 style={{ color: "#007580", fontSize: "15px" }}>
                  Experience
                </h5>
                {
                  profile?.expertise?.map((exp, i)=>{
                    return (
                      <div key={i} className="d-flex justify-content-between">
                        <span>{ exp?.name }</span>
                        <span style={{ color: "#007580" }}>{ exp?.from }-{ exp?.to }</span>
                      </div>
                    )
                  })
                }
              </div>
              <div className="--user-skills mt-3">
                <h5 style={{ color: "#007580", fontSize: "15px" }}>Skills</h5>
                <div className="col-3 mt-4">
                 {profile?.skills &&
                    profile?.skills?.map((skill, i)=>{
                      return <span key={i}>{skill}</span>
                    })
                  }
                </div>
              </div>
              {userRole ? (
                <div>
                  <h5 style={{ color: "#007580", fontSize: "15px", marginTop: "8%", }}>
                    Open Mentoring Oppourtunity
                  </h5>
                  <div className="d-flex justify-content-around align-items-center mt-3 rounded p-3 gap-1" style={{ backgroundColor: "azure" }} >
                    <h6 style={{ fontSize: "14px" }}> Website UI Design Implementaion </h6>
                    <button className="btn bg-warning rounded-pill text-white" style={{ padding: "2px 30px" }} > View </button>
                    <button className="btn bg-warning rounded-pill text-white" style={{ padding: "2px 30px" }} > Request </button>
                  </div>
                  <h5 style={{ color: "#007580", fontSize: "15px", marginTop: "8%", }}>
                    Past mentees
                  </h5>
                  <div className="d-flex">
                    <div>
                      <img src={mentor4} alt="menteeimage" className="w-75 h-75 img-thumbnail" />
                      <h5 style={{ fontSize: "14px", paddingTop: "5px" }}> Name </h5>
                      <h6 style={{ color: "#007589", fontSize: "12px" }}> Student </h6>
                    </div>
                    <div>
                      <img src={mentor4} alt="menteeimage" className="w-75 h-75 img-thumbnail" />
                      <h5 style={{ fontSize: "14px", paddingTop: "5px" }}> Name </h5>
                      <h6 style={{ color: "#007589", fontSize: "12px" }}> Student </h6>
                    </div>
                    <div>
                      <img src={mentor4} alt="menteeimage" className="w-75 h-75 img-thumbnail" />
                      <h5 style={{ fontSize: "14px", paddingTop: "5px" }}> Name </h5>
                      <h6 style={{ color: "#007589", fontSize: "12px" }}> Student </h6>
                    </div>
                    <div>
                      <img src={mentor4} alt="menteeimage" className="w-75 h-75 img-thumbnail" />
                      <h5 style={{ fontSize: "14px", paddingTop: "5px" }}> Name </h5>
                      <h6 style={{ color: "#007589", fontSize: "12px" }}> Student </h6>
                    </div>
                  </div>
                  <button className="btn rounded-pill text-white mt-5" style={{ backgroundColor: "#007580", padding: "10px 42px" }} >
                    Download Cv
                  </button>
                </div>
              ) : (
                <>
                  <h5 style={{ color: "#007580", fontSize: "15px", marginTop: "8%", }} >
                    Open Mentoring Requets
                  </h5>
                  <div className="rounded" style={{ backgroundColor: "rgba(0, 117, 137, 0.33)", marginTop: "4%", padding: "18px", }} >
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <h4 className="fs-4" style={{ color: "#007580" }}>
                        Front end Development
                      </h4>
                      <div className="d-flex align-items-end gap-2">
                        <button  className="btn rounded-pill bg-warning" style={{ padding: "4px 21px" }} >
                          View
                        </button>
                        <button className="btn rounded-pill bg-warning" style={{ padding: "4px 21px" }} >
                          Mentor
                        </button>
                      </div>
                    </div>
                    <h3 className="fs-6"> Balques hamadi{" "}
                      <span style={{ color: "#007580", fontSize: "12px" }}>
                        is looking for a mentor{" "}
                      </span>
                    </h3>
                    <p className="text-dark" style={{ fontSize: "12px", marginTop: "5%" }} >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever
                    </p>
                    <summary className="list-unstyled">...read more</summary>
                    <div style={{ marginLeft: "-6%", marginTop: "3%" }}>
                      <ul style={{ display: "grid", gridTemplateColumns: "repeat(2,auto)", listStyle: "none", }} >
                        <li style={{ color: "#007580", fontSize: "14px" }}>
                          Duration : 
                          <span className="text-dark">2 months</span>
                        </li>
                        <li style={{ color: "#007580", fontSize: "14px" }}>
                          Paid : 
                          <span className="text-dark">Yes</span>
                        </li>
                        <li style={{ color: "#007580", fontSize: "14px" }}>
                          Looking for a Job :
                          {" "}
                          <span className="text-dark">Yes</span>
                        </li>
                        <li style={{ color: "#007580", fontSize: "14px" }}>
                          Experience : 
                          <span className="text-dark">None</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <h5 style={{ color: "#007580", fontSize: "15px", marginTop: "8%", }} >
                    Perviously Mentored By
                  </h5>
                  <div className="d-flex justify-content-between">
                    <div className="d-block mt-2">
                      <h5 className="fs-5">Website UI Design Implementaion</h5>
                      <h6 className="fs-6 ps-2"> Mentored By: <span>Blel ahmed</span> </h6>
                    </div>
                    <button className="btn bg-warning rounded-pill" style={{ height: "36px", padding: "0px 27px" }} >
                      View
                    </button>
                  </div>
                  <button className="btn rounded-pill text-white mt-5" style={{ backgroundColor: "#007580", padding: "10px 42px" }}>
                    Download Cv
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-2 sm-d-none">
          <div
            className="wrappz"
            style={{ backgroundColor: "#d2d2d24f", padding: "13px", width: "fit-content", }}>
            <div className="d-flex align-items-center text-center">
              <input className="rounded mt-2 text-white text-center" style={{ backgroundColor: "#007580", padding: "9px 40px" }}
              type="text" value={searchTerm} placeholder="Search" onChange={handleSearch} />
              <i className="fa-solid fa-magnifying-glass" style={{ marginLeft: "-20%", color: "white", fontsize: "17px", marginTop: "2%", }} > </i>
            </div>
            {/* get messages */}
            <div className="msgs" style={{ marginTop: "4%", padding: "12px" }}>
              {filteredMessages?.map((msgs) => {
                return (
                  <div
                    className="d-flex gap-5 align-items-center" key={msgs.id} >
                    <img src={msgs.avatar} alt="userImages" className="w-25 h-25 rounded-circle" />
                    <div className="d-block">
                      <h4 style={{ fontSize: "14px" }}> {msgs.name} </h4>
                      <p style={{ fontSize: "12px", color: "gray" }}> {msgs.messageContent} </p>
                    </div>
                  </div>
                );
              })}
              {/* post messages */}
              <div className="d-flex flex-column gap-2">
                <div className={ msgBtnClicked ? "d-flex flex-column gap-2" : "d-none" } >
                  <div className='d-flex flex-column gap-2'>
                    <button className={`${!msgBtnClicked ? 'd-none' : 'd-flex justify-content-center'} btn btn-warning`} 
                    onClick={() => { setMsgBtnClicked(!msgBtnClicked); }}>
                      New Message
                    </button>
                    <div className={ msgBtnClicked ?  'd-flex flex-column gap-2' : 'd-none' }>
                      <textarea className='mt-2 w-100 p-1 rounded border-bottom border-warning' placeholder='enter your message'
                      id='inputMsgContent' name='textarea' value={msgContent}   
                      onChange={(e)=>{setMsgContent(e.target.value)}} />
                      <button className='btn btn-warning'
                      type="submit" onClick={(e)=> handleMessage(e)} >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ position: "relative", top: "12%", left: "2%" }}>
            {
              <div className="calendar">
                <div className="calendar-header">
                  <h2>{months[date.currentDay.getMonth()]} </h2>
                </div>
                <div className="posdate">
                  <div className="day">{date.currentDay.getDate()}</div>
                  <div className="year">{date.currentDay.getFullYear()}</div>
                </div>
                <div className="calendar-body">
                  <div className="table-header">
                    {weekdays.map((weekday) => {
                      return (
                        <div className="weekday">
                          <p>{weekday}</p>
                        </div>
                      );
                    })}
                  </div>
                  <CalendarDays
                    day={date.currentDay}
                    changeCurrentDay={changeCurrentDay}
                  />
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
);
}


export default Profile;