import { svelte, handlebars } from '@primate/frontend';
import store from '@primate/store';
import { surrealdb } from '@primate/store';
import types from '@primate/types';
import session from '@primate/session';
import { config } from 'dotenv-flow';
import { Logger } from 'primate';

config();

const {
	PORT: port,
	DB_USER: username,
	DB_PASS: password,
	DB_HOST: host,
	DB_NS: namespace,
	DB_DB: database,
	DB_PORT: db_port,
	APP_DOMAIN,
	GOOGLE_ANALYTICS_ID,
	GOOGLE_ADS_ID,
	APP_NAME,
	APP_SHORT_NAME,
	APP_DESCRIPTION
} = process.env;

console.log(host, db_port);

export default {
	logger: {
		// show all logs
		level: Logger.Info,
		trace: true
	},
	http: {
		port
		// csp: {
		// 	'default-src': '*',
		// 	'script-src': "'unsafe-inline' 'self' 'unsafe-eval' *",
		// 	'style-src': "'unsafe-inline' 'self' *",
		// 	'img-src': "'unsafe-inline' 'self' data: *"
		// }
	},
	build: {
		transform: {
			paths: [
				'pages/app.html',
				'static/manifest.json',
				'components/index.hbs'
			],
			mapper: (contents) =>
				contents
					.replaceAll('APP_DOMAIN', APP_DOMAIN)
					.replaceAll('GOOGLE_ANALYTICS_ID', GOOGLE_ANALYTICS_ID)
					.replaceAll('GOOGLE_ADS_ID', GOOGLE_ADS_ID)
					.replaceAll('APP_NAME', APP_NAME)
					.replaceAll('APP_SHORT_NAME', APP_SHORT_NAME)
					.replaceAll('APP_DESCRIPTION', APP_DESCRIPTION)
		},
		minify: false,
		excludes: ['woff', 'ttf', 'png', 'jpg', 'jpeg', 'mp4', 'mp3', 'svg'].map(
			(ext) => `*.${ext}`
		)
	},
	modules: [
		handlebars(),
		svelte({ spa: false }),
		// liveview(),
		store({
			strict: true,
			driver: surrealdb({
				host,
				port: db_port,
				namespace,
				database,
				username,
				password
			})
		}),
		types(),
		session(),
		{
			name: 'stripe-webhook-intercept',
			handle(request, next) {
				if (request.url.pathname == '/payment/stripe/webhook') {
					//set content-type to plain so the request body is unadulterated
					request.original.headers.set('content-type', 'text/plain');
				}
				return next({
					...request
				});
			}
		}
	]
};
