const onClickPostLike = async (postId) => {
  const postLikeCount = document.getElementById('post-like-count');
  const userLikeCount = document.getElementById('user-like-count');
  const response = await axios.get(`/posts/${postId}/like/`);
  postLikeCount.innerHTML = `${ response.data.postLikeCount } Likes`;
  userLikeCount.innerHTML = `내가 좋아한 글 : ${response.data.userLikeCount}개`;
}
const getCommentElement = (commentAuthor, commentContent, commentCreatedAt) => {
	let newCommentElement = document.createElement('span');
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
