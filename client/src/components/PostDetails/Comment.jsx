import React, { useState, useRef, useContext } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { GlobalContext } from "../../context/GlobalContext";
import useStyles from './styles';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();
  const { commentPost } = useContext(GlobalContext);
  const handleComment = async () => {
    const newComments = await commentPost(`${user?.result?.name}: ${comment}`, post._id);


    setComment('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: '70%' }}>
          {
            user && (
              <>
                <Typography gutterBottom variant="h6">Write a comment</Typography>
                <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                <br />
                <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
                  Comment
                </Button>
              </>
            )
          }

        </div>
      </div>
    </div>
  );
};

export default CommentSection;