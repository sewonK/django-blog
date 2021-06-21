const onClickPostLike = async (postId) => {
  const postLikeCount = document.getElementById('post-like-count');
  const userLikeCount = document.getElementById('user-like-count');
  const response = await axios.get(`/posts/${postId}/like/`);
  postLikeCount.innerHTML = `${ response.data.postLikeCount } Likes`;
  userLikeCount.innerHTML = `내가 좋아한 글 : ${response.data.userLikeCount}개`;
}
const getCommentElement = (commentAuthor, commentContent, commentCreatedAt) => {
	let newCommentElement = document.createElement('p');
  newCommentElement.innerHTML = `${commentAuthor}: ${commentContent}&nbsp; &nbsp;${commentCreatedAt}`;
  return newCommentElement; 
}

const onClickCommentCreate = async (postId) => {
  const commentInputElement = document.getElementById('comment-input');
  if (commentInputElement.value) {
    let data = new FormData();
    data.append("content", commentInputElement.value);
    const response = await axios.post(`/posts/${postId}/comments/`, data);
    const commentElement = getCommentElement(response.data.commentAuthor, commentInputElement.value, response.data.commentCreatedAt);
    document.getElementById("comment-container").appendChild(commentElement);
    commentInputElement.value = '';
  }
}

const onClickCommentLike = async (postId, cId) => {
  const commentLikeCount = document.getElementById(`${cId}-like-count`);
  const response = await axios.get(`/posts/${postId}/comments/${cId}/like`);
  commentLikeCount.innerHTML = `${response.data.commentLikeCount} Likes`;
}

const onClickCommentDelete = async (postId, cId) => {
  if(confirm("정말 삭제하시겠습니까?") == true){
    const commentElement = document.getElementById(`${cId}-comment`);
    await axios.delete(`/posts/${postId}/comments/${cId}/delete`);
    commentElement.remove();
  }
}