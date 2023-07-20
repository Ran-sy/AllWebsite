import React, { useEffect, useState } from 'react'
import { comments } from '../data/data'
import Comment from './comment'
import axios from 'axios'
import { useSelector } from 'react-redux'
const Comments = () => {
  const [inputComment, setInputComments] = useState('')
  const [comment, setComments] = useState(comments)
  const user=useSelector(state=>state.user.value)
  console.log(user);
  // do add reply comment
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
  useEffect(() => {
      const fetchComments = async (url,set) => {
        try {
          const res = await axios.get(`/comment/45362577`);
          set(res.data);
        } catch (err) {}
      };
      fetchComments(comment,setComments);
      
    }, [comment]);
      const handleSubmit = async () => {
        try {
          const url = "http://localhost:5000/api/v1/comment/320994";
          await axios.post(url, { desc: inputComment });
          setComments([...comment, newComment(inputComment)]);
          setInputComments("");
        } catch (error) {
          console.log("there is an error");
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