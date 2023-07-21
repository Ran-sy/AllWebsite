import React, { useEffect, useState } from 'react'
import { comments } from '../data/data'
import Comment from './comment'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Localhost } from "../../config/api";
import { useDispatch } from 'react-redux'
const Comments = () => {
  const [inputComment, setInputComments] = useState('')
  const [comment, setComments] = useState(comments)
  const [replie,setReplies]=useState([])
  // do add reply comment
  const currentUser = useSelector((state) => state);
  const dispatch = useDispatch();
console.log(currentUser);
  function addReply(commentId, replyText) {
    let commentsWithNewReply = [...comment];  
    insertComment(commentsWithNewReply, commentId, replyText);
    setComments(commentsWithNewReply);
  }
  // do  add comment to chidren
  function insertComment(comment, parentId, text) {
    for (let i = 0; i < comment.length; i++) {
      if (comment[i].id === parentId) { 
        comment[i].children.unshift((newComment(text)))
      }
    }
  }
  // do new comment
  function newComment(text) {
    return {
      id: +1,
      body: text,
      name: 'Nora Ali',
      img: "https://image.lexica.art/full_jpg/f2a8605f-f7fd-4430-86a0-2870e5a1327a",
      children: []
    };
  }
  const handelClick = () => {
    setComments([...comment, newComment(inputComment)]);
    setInputComments("");
  } 
  // useEffect(() => {
  //     const fetchComments = async () => {
  //       try {
  //         const res = await axios.get(
  //           `http://localhost:5000/api/v1/comment/64ba686dee48158f93f7c263`,
  //           { withCredentials: true }
  //         );
  //         setComments(res.data);
  //       } catch (err) {}
  //     };
  //     fetchComments();
  //     const fetchReplies = async (url, set) => {

  //       try {
  //         const res = await axios.get(
  //           `http://localhost:5000/replies/45362577`,
  //           { withCredentials: true }
  //         );
  //         setReplies(res.data);
  //       } catch (err) {}
  //     };
  //     fetchComments();
  //   }, [comment]);
     console.log(inputComment);
      const handleSubmit = async () => {
       
        try {
          const url = `http://localhost:5000/api/v1/comment/4567879`;
           await axios.post(
             `http://localhost:5000/api/v1/comment/64ba686dee48158f93f7c263`,
             {
               desc: inputComment,
             },{ withCredentials: true }
           ); 
          setComments([...comment, newComment(inputComment)]);
          setInputComments("");
        } catch (error) {
          console.log(error.message);
        }
      };
  return (
    <div className='px-5 comments mt-4'>
      {/* comment list  */}
      <div className="row color-gray radius p-3">
        {
          comment.map(items => (
            <Comment key={items.id} item={items} addReply={addReply} />
          ))
        }
      </div>
      {/* comment form  */}
      <div className='row my-3'>
        <div className='col d-flex flex-column radius'>
          <input className='w-100 form-control rounded-pill ps-3' value={inputComment} onChange={e => setInputComments(e.target.value)} placeholder='leave your comment here' />
          <button onClick={handleSubmit} className='ms-auto mt-3  color-secondary btn px-4 py-1 rounded-pill'>send</button>
        </div>
      </div>
    </div>
  )
}

export default Comments