export const signupFeature = {
	bodyTag: document.querySelector('body'),
	inputTags: [...document.querySelectorAll('input')],
	signupErrorModal: document.getElementById('signup-error-modal'),

	handleSignup(e) {
		e.preventDefault();

		if (
			this.validateUsername(this.getUsername()) &&
			this.validatePassword(this.getPasswords())
		) {
			this.submitTarget(e);
		} else {
			this.dismissSignup();
		}
	},

	getUsername() {
		return document.querySelector('input[name=username]').value;
	},

	validateUsername(username) {
		return username !== '';
	},

	getPasswords() {
		return [...document.querySelectorAll('input[type=password]')].map(
			(input) => input.value
		);
	},

	isSamePassword([pw1, pw2]) {
		return pw1 === pw2;
	},

	isValidFormatPassword([pw]) {
		const regExp = /^[A-Za-z0-9]{3,}$/;

		return regExp.test(pw);
	},

	validatePassword(passwords) {
		return (
			this.isSamePassword(passwords) && this.isValidFormatPassword(passwords)
		);
	},

	submitTarget(e) {
		e.target.submit();
	},

	dismissSignup() {
		this.showErrorModal();
		this.setGrayBackGroundColor();
		this.disableInputTags();
	},

	handleClose() {
		this.hideErrorModal();
		this.resetGrayBackGroundColor();
		this.enableInputTags();
	},

	showErrorModal() {
		this.signupErrorModal.classList.add('show');
	},

	hideErrorModal() {
		this.signupErrorModal.classList.remove('show');
	},

	setGrayBackGroundColor() {
		this.bodyTag.classList.add('gray');
	},

	resetGrayBackGroundColor() {
		this.bodyTag.classList.remove('gray');
	},

	disableInputTags() {
		this.inputTags.forEach((inputTag) => (inputTag.disabled = true));
	},

	enableInputTags() {
		this.inputTags.forEach((inputTags) => (inputTags.disabled = false));
	},
};
