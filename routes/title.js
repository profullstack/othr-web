import { view, redirect } from 'primate';
import { JSDOM } from 'jsdom';

export default {
	async get(request) {
		const { session, query } = request;
		const url = query.get('url');

		const res = await fetch(url);
		const html = await res.text();
		const dom = new JSDOM(html);
		// Access the document
		const { document } = dom.window;
		const { title } = document;

		console.log(url, title);

		return {
			title,
			url
		};
	}
};
