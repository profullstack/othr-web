import { redirect } from 'primate';

export default (request) => {
	const {
		url: { pathname }
	} = request;

	const allow = ['/payment/stripe/webhook'];
	console.log(allow, pathname);

	if (allow.includes(pathname)) {
		return true;
	}

	const { session } = request;

	if (session.get('loggedIn')) {
		return true;
	}

	return redirect(`/login?next=${pathname}`);
};
