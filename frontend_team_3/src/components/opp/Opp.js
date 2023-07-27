// import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFileCsv, faLocationDot, faBriefcase, faDollarSign } from '@fortawesome/free-solid-svg-icons'
// import { faClock } from '@fortawesome/free-regular-svg-icons'
// import '../../pages/showOpp/style.css'

// const Opp = ({ item }) => {
//    return (
//       <div className='opp color-gray px-5 pt-5'>
//          <div className={`box ${item.hired ? "closed" : "open"} px-4 py-2`}>
//             <span>{item.hired ? "closed mentoring opportunity" : "open mentoring opportunity"} </span>
//          </div>
//          <div className='mb-5 text-capitalize'>
//             <h3 className='fw-bold'>{item.title}</h3>
//             {item.hired ? (
//                <h4 className='fw-bold'>Get mentored by : <span className='data1'>Belal Shwani</span></h4>
//             ) : ''}
//          </div>

//          <div className='lh-base des'>
//             <p>{item.oop_des}</p>
//          </div>

//          <div className='d-flex flex-wrap my-3 text-capitalize'>

//             {item.hired && (<p className='info1 my-2 '>
//                <span className='me-1'><FontAwesomeIcon icon={faFileCsv} className='fa-2xl' /> certificate :</span>
//                <span className='data1'>{item.certificate}</span>
//             </p>)}

//             <p className='info1 my-2'>
//                <span className='me-1'><FontAwesomeIcon icon={faLocationDot} className='fa-2xl' /> location :</span>
//                <span className='data1'>{item.location}</span>
//             </p>
//             {item.hired ? (
//                <p className='info1 my-2'>
//                   <span className='me-1'><FontAwesomeIcon icon={faBriefcase} className='fa-2xl' /> might get hired :</span>
//                   <span className='data1'> yes</span>
//                </p>
//             ) : (
//                item.opp_experise && (<p className='info1 my-2'>
//                   <span className='me-1'><FontAwesomeIcon icon={faBriefcase} className='fa-2xl' /> experise :</span>
//                   <span className='data1'> yes</span>
//                </p>))
//             }
//             <p className='info1 my-2'>
//                <span className='me-1'><FontAwesomeIcon icon={faDollarSign} className='fa-2xl' /> paid :</span>
//                <span className='data1'>{item.paid} sdg / H</span>
//             </p>

//             <p className='info1 my-2'>
//                <span className='me-1'><FontAwesomeIcon icon={faClock} className='fa-2xl' /> duration :</span>
//                <span className='data1'>{item.duration}</span>
//             </p>
//          </div>


//          <div className=''>
//             <div>
//                <h4 className='data1 text-capitalize fw-bold'> {item.hired ? "responsibilities" : "i'm looking for help with"}</h4>
//                <ul>
//                   {item.responsibilities.map((q, i) => <li key={i}>{q}</li>)}
//                </ul>
//             </div>

//             <div>
//                <h4 className='data1 text-capitalize fw-bold'>requirements</h4>
//                <ul>
//                   {item.requirements.map((q, i) => <li key={i}>{q}</li>)}
//                </ul>
//             </div>

//             <div>
//                <h4 className='data1 text-capitalize fw-bold'> {item.hired ? "expected outcome" : "i have a background about"}</h4>
//                <ul>
//                   {item.expected_outcome.map((q, i) => <li key={i}>{q}</li>)}
//                </ul>
//             </div>

//          </div>

//       </div>
//    )
// }

// export default Opp


import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCsv, faLocationDot, faBriefcase, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import '../../pages/showOpp/style.css'
import axios from 'axios'
import { loginFailure } from '../../features/user'
import { Localhost } from '../../config/api'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Opp = () => {
   const [data, setData] = useState([])
   const user = useSelector(state => state.currentUser)
   const { id } = useParams()
   const dispatch = useDispatch()

   useEffect(() => {
      const getOpp = async () => {
     
         await axios
           .get(`${Localhost}/api/opp/opp/${id}`, {
             withCredentials: true,
           })
           .then((res) => {
             setData(res.data);
           })
           .catch((error) => {
             console.log(error);
           });
      };
      getOpp();
   }, [id]);

   return (
      <div className='opp color-gray px-5 pt-5'>
         {data.map((item) => (
            <>
               <div className={`box ${item.hired ? "closed" : "open"} px-4 py-2`}>
                  <span>{item.hired ? "closed mentoring opportunity" : "open mentoring opportunity"} </span>
               </div>
               <div className='mb-5 text-capitalize'>
                  <h3 className='fw-bold'>{item.title}</h3>
                  {item.hired ? (
                     <h4 className='fw-bold'>Get mentored by : <span className='data1'>Belal Shwani</span></h4>
                  ) : ''}
               </div>

               <div className='lh-base des'>
                  <p>{item.oop_des}</p>
               </div>

               <div className='d-flex flex-wrap my-3 text-capitalize'>

                  {item.hired && (<p className='info1 my-2 '>
                     <span className='me-1'><FontAwesomeIcon icon={faFileCsv} className='fa-2xl' /> certificate :</span>
                     <span className='data1'>{item.certificate}</span>
                  </p>)}

                  <p className='info1 my-2'>
                     <span className='me-1'><FontAwesomeIcon icon={faLocationDot} className='fa-2xl' /> location :</span>
                     <span className='data1'>{item.location}</span>
                  </p>
                  {item.hired ? (
                     <p className='info1 my-2'>
                        <span className='me-1'><FontAwesomeIcon icon={faBriefcase} className='fa-2xl' /> might get hired :</span>
                        <span className='data1'> yes</span>
                     </p>
                  ) : (
                     item.opp_experise && (<p className='info1 my-2'>
                        <span className='me-1'><FontAwesomeIcon icon={faBriefcase} className='fa-2xl' /> experise :</span>
                        <span className='data1'> yes</span>
                     </p>))
                  }
                  <p className='info1 my-2'>
                     <span className='me-1'><FontAwesomeIcon icon={faDollarSign} className='fa-2xl' /> paid :</span>
                     <span className='data1'>{item.paid} sdg / H</span>
                  </p>

                  <p className='info1 my-2'>
                     <span className='me-1'><FontAwesomeIcon icon={faClock} className='fa-2xl' /> duration :</span>
                     <span className='data1'>{item.duration}</span>
                  </p>
               </div>


               <div className=''>
                  <div>
                     <h4 className='data1 text-capitalize fw-bold'> {item.hired ? "responsibilities" : "i'm looking for help with"}</h4>
                     <ul>
                        {item.responsibilities.map((q, i) => <li key={i}>{q}</li>)}
                     </ul>
                  </div>

                  <div>
                     <h4 className='data1 text-capitalize fw-bold'>requirements</h4>
                     <ul>
                        {item.requirements.map((q, i) => <li key={i}>{q}</li>)}
                     </ul>
                  </div>

                  <div>
                     <h4 className='data1 text-capitalize fw-bold'> {item.hired ? "expected outcome" : "i have a background about"}</h4>
                     <ul>
                        {item.expected_outcome.map((q, i) => <li key={i}>{q}</li>)}
                     </ul>
                  </div>

               </div>
            </>
         ))}

      </div>
   )
}

export default Opp