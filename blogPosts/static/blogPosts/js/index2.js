const onClickLikeButton = async (postId) => {
  const postLikeButton = document.getElementById(`${postId}-like-button`);
  const userLikeCount = document.getElementById('user-like-count');
  const response = await axios.get(`/posts/${postId}/like/`);
  postLikeButton.setAttribute('data-badge', response.data.postLikeCount);
	if(response.data.postLikeOfUser == 1) {
    postLikeButton.innerHTML = "favorite";
  } else {
    postLikeButton.innerHTML = "favorite_border";
  }
  userLikeCount.innerHTML = `내가 좋아한 글 : ${response.data.userLikeCount}개`;
}

const getTagElement = (tagContent, tagId) => {
	let newTagElement = document.createElement('a');
	newTagElement.setAttribute('href', `/tags/${tagId}/`);
  newTagElement.innerHTML = tagContent;
  return newTagElement; 
}

const onAddTag = async () => {
  const tagInputElement = document.getElementById("tag-input");
  if(tagInputElement.value) {
    let data = new FormData();
    data.append("content", tagInputElement.value);
		const response = await axios.post(`/tags/new/`, data);
    const tagElement = getTagElement(tagInputElement.value, response.data.tagId);
    document.getElementById("tag-list").appendChild(tagElement);
    tagInputElement.value = '';
  }
}

const onClickDeleteButton = async (postId) => {
  if(confirm("정말 삭제하시겠습니까?") == true){
    const postElement = document.getElementById(`${postId}-post`);
    const userLikeCount = document.getElementById("user-like-count");
    const response = await axios.delete(`/posts/${postId}/delete/`, postId);
    postElement.remove();
    userLikeCount.innerHTML = `내가 좋아한 글 : ${response.data.userLikeCount}개`
  }
}