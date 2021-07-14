import { signupFeature } from './signupFeature.js';

(() => {
	const signupForm = document.getElementById('signup-form');
	signupForm.onsubmit = (e) => signupFeature.handleSignup(e);
})();

(() => {
	const modalCloseBtn = document.querySelector('.modal-header > .close-button');
	modalCloseBtn.onclick = () => signupFeature.handleClose();
})();
