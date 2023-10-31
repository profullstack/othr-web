class SocialShare extends HTMLElement {
	constructor() {
		super();
	}

	share(name, script) {
		const el = document.querySelector(`.share ${name}`);
		if (!el) return;
		el.setAttribute('href', script);
	}

	connectedCallback() {
		this.innerHTML = `
    <style>
		* {
			box-sizing: border-box;
		}

		@font-face {
			font-family: 'Rubik';
			src: url(/static/fonts/Rubik-Regular.ttf) format('opentype');
			font-weight: 400;
		}

        .share {
            margin: 2rem 0;
            display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-wrap: wrap;
			text-align: center;
            padding: 1.1rem 1.1rem 1.1rem 0;
            border: none;
			background: #603E26;
			box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.12);
        }

		.share :is(a, a:visited) {
			color: #fff !important;
			font-weight: 700 !important;
			font-size: 1.5rem;
			text-transform: capitalize;
			margin: 1.2rem !important;
		}

		.share strong {
			background-color: #452D1B;
			padding: .4rem;
			text-transform: uppercase;
			font-size: 1.4rem;
			font-weight: 700;
			color: #fff;
		}

		.share > * {
			margin-right: 2rem;
		}

		@media (max-width: 560px) {
			.share {
					flex-direction: column;
					align-items: flex-start;
					gap: 1.2rem;	
			}

			.share a, share a:visited {
				margin-left: 1.2rem;
			}
		}
    </style>
    <nav class="share">
        <strong>Share on social media</strong>
		<a href="#" class="stacker-news">stacker.news</a>
        <a href="#" class="twitter">twitter</a>
        <a href="#" class="reddit">reddit</a>
        <a href="#" class="hackernews">hackernews</a>
        <a href="#" class="tildes">tildes</a>
        <a href="#" class="headcycle">+headcycle</a>
        <a href="#" class="facebook">facebook</a>
		<a href="#" class="pinterest">pinterest</a>
		<a href="#" class="whatsapp">whatsapp</a>
		<a href="#" class="tiktok">tiktok</a>
		<a href="#" class="snapchat">snapchat</a>
		<a href="#" class="instagram">instagram</a>
		<a href="#" class="telegram">telegram</a>
		<a href="#" class="sitejabber">sitejabber</a>
		<a href="#" class="trustpilot">trustpilot</a>
		<a href="#" class="tumblr">tumblr</a>
		<a href="#" class="linkedin">linkedin</a>
		<a href="#" class="pocket">pocket</a>
		<a href="#" class="email">email</a>
		<a href="#" class="buffer">buffer</a>
		<a href="#" class="instapaper">instapaper</a>
		<a href="#" class="evernote">evernote</a>
		<a href="#" class="weibo">weibo</a>
		<a href="#" class="xing">xing</a>
		<a href="#" class="vk">vk</a>
		<a href="#" class="flipboard">flipboard</a>
		<a href="#" class="trustedreviews">trustedrevie.ws</a>
    </nav>
`;

		this.share(
			'.stacker-news',
			"javascript:(async () => {const title = document.getElementById('title').value; const url = document.getElementById('url').value; window.open(`https://stacker.news/~tech/post?type=link&url=${url}&title=${title}`, '_blank'); })();"
		);
		this.share(
			'.twitter',
			"javascript:(async () => {const title = document.getElementById('title').value; const url = document.getElementById('url').value; const tags = [...document.querySelectorAll('.tags li a')].slice(0,4).map(t => t.innerText.trim().replace(/-/g, '')).map(t => `${encodeURIComponent('#'+t)}`).join(' '); console.log(tags); window.open(`https://twitter.com/intent/tweet?text=${title}+${tags}&url=${url}`, '_blank'); })();"
		);
		this.share(
			'.reddit',
			"javascript:(async () => {const title = document.getElementById('title').value; const url = document.getElementById('url').value; window.open(`https://www.reddit.com/submit?url=${url}&title=${title}`, '_blank'); })();"
		);
		this.share(
			'.hackernews',
			"javascript:(async () => {const title = document.getElementById('title').value; const url = document.getElementById('url').value; window.open(`https://news.ycombinator.com/submitlink?u=${url}&t=${title}`, '_blank'); })();"
		);
		this.share(
			'.tildes',
			"javascript:(async () => {const title = document.getElementById('title').value; const url = document.getElementById('url').value; window.open(`https://tildes.net/~tech/new_topic?link=${url}&title=${title}`, '_blank'); })();"
		);
		this.share(
			'.headcycle',
			"javascript:(async () => {const title = document.getElementById('title').value; const url = document.getElementById('url').value; window.open(`http://headcycle.com/submit?v=3&tab_selected=link;url=${url};title=${title}`, '_blank'); })();"
		);
		this.share(
			'.facebook',
			"javascript:(async () => {open('https://www.facebook.com/sharer.php?src=bm&v=4&i=1301235609&u='+encodeURIComponent(window.location.href)+'&t='+encodeURIComponent(document.title), '_blank') })();"
		);
		this.share(
			'.pinterest',
			"javascript:(async () => {open(`https://www.pinterest.com/pin/create/link/?url=${window.location}&media=${document.querySelector('meta[property=\"og:image\"]').getAttribute('content')}&description=${document.title}`, '_blank') })();"
		);
		this.share(
			'.whatsapp',
			 "javascript:(async () => {const title = document.getElementById('title').value; const url = document.getElementById('url').value; window.open(`https://api.whatsapp.com/send?text=${title}%20${url}`, '_blank'); })()"
		);
		this.share(
			'.telegram',
			"javascript:(async () => {const title = document.getElementById('title').value; const url = document.getElementById('url').value; window.open(`https://t.me/share/url?url=${url}&text=${title}`, '_blank'); })()"
		)
		this.share(
			'.tiktok',
			"javascript:(async () => {const url = document.getElementById('url').value; window.open(`https://www.tiktok.com/upload/?url=${url}`, '_blank'); })()"
		);
		this.share(
			'.snapchat',
			"javascript:(async () => {const url = document.getElementById('url').value; window.open(`snapchat://add?url=${url}`, '_blank'); })()"
		);
		this.share(
			'.instagram',
			"javascript:(async () => {const url = document.getElementById('url').value; window.open(`instagram://camera?url=${url}`, '_blank'); })()"
		);

		this.share(
			'.sitejabber',
			"javascript:(async () => {const url = document.getElementById('url').value; window.open(`https://www.sitejabber.com/reviews/${new URL(window.location.href).hostname}`, '_blank'); })()"
		);

		this.share(
			'.trustedreviews',
			"javascript:(async () => {const url = document.getElementById('url').value; window.open(`https://trustedrevie.ws/reviews/${new URL(window.location.href).hostname}`, '_blank'); })()"
		);

		this.share(
			'.trustpilot',
			"javascript:(async () => {const url = document.getElementById('url').value; window.open(`https://www.trustpilot.com/review/${new URL(window.location.href).hostname}`, '_blank'); })()"
		);

		this.share(
			'.linkedin',
			"javascript:(async () => {const url = document.getElementById('url').value; window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent(document.title)}`, '_blank'); })()"
		);

		this.share(
			'.tumblr',
			"javascript:(async () => {const url = document.getElementById('url').value; window.open(`https://www.tumblr.com/share/link?url=${url}&name=${encodeURIComponent(document.title)}`, '_blank'); })()"
		);

		this.share(
			'.pocket',
			"javascript:(async () => {const url = document.getElementById('url').value; window.open(`https://getpocket.com/save?url=${url}&title=${encodeURIComponent(document.title)}`, '_blank'); })()"
		);

		this.share(
			'.buffer',
			"javascript:(async () => {const url = document.getElementById('url').value; window.open(`https://buffer.com/add?url=${url}&text=${encodeURIComponent(document.title)}`, '_blank'); })()"
		);

		this.share(
			'.instapaper',
			"javascript:(async () => {const url = document.getElementById('url').value; window.open(`https://www.instapaper.com/hello2?url=${url}&title=${encodeURIComponent(document.title)}`, '_blank'); })()"
		);

		this.share(
			'.evernote',
			"javascript:(async () => {const url = document.getElementById('url').value; window.open(`https://www.evernote.com/clip.action?url=?url=${url}&title=${encodeURIComponent(document.title)}`, '_blank'); })()"
		);

		this.share(
			'.email',
			"javascript:(async () => {const url = document.getElementById('url').value; window.open(`mailto:?body=${url}&subject=${encodeURIComponent(document.title)}`, '_blank'); })()"
		);

		this.share(
			'.weibo',
			"javascript:(async () => {const url = document.getElementById('url').value; window.open(`http://service.weibo.com/share/share.php?url=${url}&title=${encodeURIComponent(document.title)}`, '_blank'); })()"
		);

		this.share(
			'.xing',
			"javascript:(async () => {const url = document.getElementById('url').value; window.open(`https://www.xing.com/spi/shares/new?url=${url}`, '_blank'); })()"
		);

		this.share(
			'.vk',
			"javascript:(async () => {const url = document.getElementById('url').value; window.open(`https://vk.com/share.php?url=${url}&title=${encodeURIComponent(document.title)}`, '_blank'); })()"
		);

		this.share(
			'.flipboard',
			"javascript:(async () => {const url = document.getElementById('url').value; window.open(`https://share.flipboard.com/bookmarklet/popout?v=2&title=${encodeURIComponent(document.title)}&url=${url}`, '_blank'); })()"
		);
	}
}

customElements.define('social-share', SocialShare);

