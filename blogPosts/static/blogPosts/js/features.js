export const footerFeature = {
	copyrightTag: document.getElementById('copyright-text'),

	setYear() {
		const thisYear = new Date().getFullYear();
		this.copyrightTag.textContent = `SNU LIKELION © ${thisYear}`;
	},
};

export const searchFeature = {
	doSearch() {
		const searchKeyword = document.getElementById('search-bar').value;
    const posts = this.getAllPosts();
		const unMatchedPosts = this.getUnMatchedPosts(posts, searchKeyword);
		this.hidePosts(unMatchedPosts);
	},

	getAllPosts() {
		const posts = [
			...document.querySelectorAll(
				'.demo-card-square.mdl-card.mdl-shadow--2dp'
			),
		];

		return posts.map((post) => ({
			post,
			postTitle: post.firstElementChild.nextElementSibling.textContent.trim(),
		}));
	},

	getUnMatchedPosts(posts, searchKeyword) {
		return posts.filter(({ postTitle }) => !postTitle.includes(searchKeyword));
	},

	hidePosts(posts) {
		return posts.forEach(({ post }) => post.classList.add('hide'));
	},

  showPosts(posts) {
		return posts.forEach(({ post }) => post.classList.remove('hide'));
	},

	reset() {
		this.showPosts(this.getAllPosts());
	},
};

export const postFeature = {
	saveHistory() {
		const viewedPosts = this.getHistory();

		const {
			dataset: { postId },
			textContent: postTitle,
		} = document.getElementById('post-title');

		if (!this.isDuplicate(viewedPosts, postId)) {
			localStorage.setItem(
				'viewedPosts',
				JSON.stringify([{ postId, postTitle }, ...viewedPosts])
			);
		}
	},

  getHistory() {
		return JSON.parse(localStorage.getItem('viewedPosts')) || [];
	},

	isDuplicate(viewedPosts, newPostId) {
		return viewedPosts.some(
			({ postId: savedPostId }) => savedPostId === newPostId
		);
	},

  removeHistory() {
    return localStorage.removeItem('viewedPosts');
  },
};

export const logoutFeature = {
	logoutModal: document.getElementById('log-out-modal'),

	handleLogout(e) {
		e.preventDefault();
		this.showModal();

    const viewedPosts = postFeature.getHistory();
		const modalContent = document.querySelector(
			'#log-out-modal > .modal-content'
		);
		const hasLogoutModalOpened =
			modalContent.children.length === viewedPosts.length;

		if (!hasLogoutModalOpened) {
			this.setViewedPostCount(viewedPosts);
			this.showViewedPostTitle(viewedPosts);
		}
	},
	
  handleCancel() {
		this.hideModal();
	},

	hideModal() {
		this.logoutModal.classList.remove('show');
	},

	showModal() {
		this.logoutModal.classList.add('show');
	},

  setViewedPostCount(viewedPosts) {
		document.querySelector(
			'#log-out-modal > .modal-header > .viewed-post-count'
		).textContent = viewedPosts.length;
	},

	showViewedPostTitle(viewedPosts) {
		const fragment = document.createDocumentFragment();

		viewedPosts.forEach(({ postTitle }) => {
			fragment.appendChild(
				this.makeElement(['li', 'class', 'viewed-post', postTitle])
			);
		});

		const modalContent = document.querySelector(
			'#log-out-modal > .modal-content'
		);
		modalContent.appendChild(fragment);
	},

	makeElement([tagName, attribute, value, textContent]) {
		const element = document.createElement(tagName || 'li');
		element.setAttribute(attribute || 'class', value || '');
		element.textContent = textContent || '';

		return element;
	},

  handleModalLogout() {
		const redirectUrl = this.getRedirectUrl();
		this.moveToUrl(redirectUrl);
		postFeature.removeHistory();
	},

	getRedirectUrl() {
		return document.getElementById('logout').getAttribute('href');
	},

	moveToUrl(redirectUrl) {
		window.location.href = redirectUrl;
	},
};
