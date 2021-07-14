const onClickPostLike = async (postId) => {
  const postLikeCount = document.getElementById('post-like-count');
  const userLikeCount = document.getElementById('user-like-count');
  const response = await axios.get(`/posts/${postId}/like/`);
  postLikeCount.innerHTML = `${ response.data.postLikeCount } Likes`;
  userLikeCount.innerHTML = `내가 좋아한 글 : ${response.data.userLikeCount}개`;
}

const onSetCommentCount = (commentCount) => {
  const commentCountElement = document.getElementById('comment-count');
  commentCountElement.innerHTML = `<strong>댓글이 ${commentCount}개 있습니다</strong>`;
}

const getCommentElement = (postId, commentId, commentLikeCount, commentAuthor, commentContent, commentCreatedAt) => {
	let newCommentElement = document.createElement('p');
  newCommentElement.innerHTML = `${commentAuthor}: ${commentContent}&nbsp; &nbsp;${commentCreatedAt}`;

  newCommentElement.innerHTML = `${commentAuthor}: ${commentContent} &nbsp; &nbsp; ${commentCreatedAt}
  <a id="comment${commentId}-like-button" onclick="onLikeComment(${commentId})">
  ${ commentLikeCount } Likes </a>
  <a onclick="onDeleteComment(${postId}, ${commentId})">댓글 삭제</a>`  

  return newCommentElement; 
}

const onClickCommentCreate = async (postId) => {
  const commentInputElement = document.getElementById('comment-input');
  if (commentInputElement.value) {
    let data = new FormData();
    data.append("content", commentInputElement.value);
    const response = await axios.post(`/posts/${postId}/comments/`, data);
    const commentElement = getCommentElement(postId, response.data.commentId, response.data.commentLikeCount, response.data.commentAuthor, commentInputElement.value, response.data.commentCreatedAt);
    document.getElementById("comment-container").appendChild(commentElement);
    commentInputElement.value = '';
    onSetCommentCount(response.data.commentCount);
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