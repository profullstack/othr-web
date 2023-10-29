// import retextKeywords from 'https://esm.sh/retext-keywords@7?bundle';
// import retextPos from 'https://esm.sh/retext-pos@4.1.0?bundle';
// import { retext } from 'https://esm.sh/retext@8.1.0?bundle';
// import { Readability } from 'https://esm.sh/@mozilla/readability@0.4.2?no-check';
// import { toString } from 'https://esm.sh/nlcst-to-string@3.1.0?bundle';

class SponsorList extends HTMLElement {
	constructor() {
		super();

		this.ads = [];
		this.adIdx = 0;
		this.adsUrl = '/static/sponsors.json';
		this.render = this.render.bind(this);
		this.getAds = this.getAds.bind(this);
		this.renderAds = this.renderAds.bind(this);
		this.startSlideShow = this.startSlideShow.bind(this);
		this.parsePage = this.parsePage.bind(this);
	}

	static get observedAttributes() {
		return ['ads'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log('attributesChanged', name, oldValue, newValue);

		if (name === 'ads') {
			this.adsUrl = newValue;
		}

		this.render();
	}

	async parsePage(e) {
		e.preventDefault();
		const url = e.target.href;

		console.log('parsePage:', url);

		try {
			// const article = new Readability(document).parse();

			// console.log('article:', article);
			// if (!article) return;

			// const nodes = await retext()
			// 	.use(retextPos)
			// 	.use(retextKeywords)
			// 	.process(`${article.title} - ${article.textContent}`);

			// const keywords = nodes.data.keywords.map((k) => toString(k.matches[0].node).toLowerCase());
			// const phrases = nodes.data.keyphrases.map((p) =>
			// 	p.matches[0].nodes
			// 		.map((d) => toString(d).toLowerCase())
			// 		.join('')
			// 		.replace(/\s+/g, '-')
			// );
			// const tags = [...new Set([].concat(keywords, phrases))];
			// console.log('tags:', tags);

			const { userAgent, connection } = window.navigator;
			const body = JSON.stringify({
				url,
				referrer: window.location.href,
				userAgent,
				connection,
				createdAt: new Date().toISOString()
			});

			console.log('body: ', body);
			const res = await fetch('/noop', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body
			});

			await res.json();

			if (!res.ok) {
				console.error(await res.text());
			}
		} catch (err) {
			console.log('parsePage had an error.');
		} finally {
			// await this.sleep(10000);
			window.location = url;
		}
	}

	async getAds() {
		try {
			const res = await fetch(this.adsUrl);
			const data = await res.json();

			// tandomize array
			this.ads = data
				.map((value) => ({ value, sort: Math.random() }))
				.sort((a, b) => a.sort - b.sort)
				.map(({ value }) => value);

			console.log(this.ads);
		} catch (err) {
			console.error(err);
		}
	}

	async sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async render() {
		await this.getAds();

		this.innerHTML = `
    <style>
		* {
			box-sizing: border-box;
		}

		.sponsors {
			margin: 1.2rem 0;
			border: 1px solid transparent;
			position: relative;

		}

		@font-face {
			font-family: 'Rubik';
			src: url(/static/fonts/Rubik-Regular.ttf) format('opentype');
			font-weight: 400;
		}

      .sponsor {
		font-family: Rubik;
        display: none;
    	padding: 5.6rem 2.8rem 2.8rem;
		background-color: #DAC1AF;
		color: #452D1B;
		font-size: 1.8rem;
		font-weight: 700;
		line-height: 2.3rem;
      }

	  .sponsor a {
		color: #452D1B;
		text-decoration: underline;
		font-weight: 700;
	  }

      .sponsor p {
        margin: 0;
      }

	  .sponsors h4 {
		font-weight: 700;
		font-size: 1.4rem;
		border-width: 1px;
		border-style: transparent;
		background: linear-gradient(236.08deg, #C33333 12.16%, #E16A3F 84.69%);
		padding: 1.2rem;
		position: absolute;
		left: 0;
		top: 0;
		margin: 0;
		text-transform: uppercase;
	}

      .fade {
        animation-name: fade;
        animation-duration: .5s;
      }

      @keyframes fade {
        from {opacity: .4}
        to {opacity: 1}
      }

			@media (min-width: 420px) {
			}
    </style>

    <div class="sponsors">
	    <h4>sponsor</h4>
    	${this.renderAds()}
	</div>
`;
		const sponsors = [...this.querySelectorAll('.sponsor a')];

		sponsors.map((sponsor) => {
			sponsor.addEventListener('click', this.parsePage);
		});

		this.startSlideShow();
	}

	startSlideShow() {
		const ads = [...this.querySelectorAll('.sponsor')];

		for (let i = 0; i < ads.length; i++) {
			ads[i].style.display = 'none';
		}

		this.adIdx++;

		if (this.adIdx > ads.length) {
			this.adIdx = 1;
		}

		ads[this.adIdx - 1].style.display = 'block';
		setTimeout(this.startSlideShow, 15000);
	}

	renderAds() {
		return `
      ${this.ads
				.map((ad) => {
					return `<div class="sponsor fade">${ad}</div>`;
				})
				.join('')}
      `;
	}

	async connectedCallback() {
		// this.attachShadow({ mode: 'open' });
		await this.render();
	}

	disconnectedCallback() {
		const sponsors = [...this.querySelectorAll('.sponsor a')];

		sponsors.map((sponsor) => {
			sponsor.removeEventListener('click');
		});
	}

	navigateAd(e) {
		e.preventDefault();
		const el = e.target;
		const dir = el.href.split('#')[1];

		console.log(dir);
	}
}

customElements.define('sponsor-list', SponsorList);

// export default SponsorList;
