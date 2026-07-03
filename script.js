
// Simple navigation helpers: home and index
function goHome() {
	// If there's a content container, update it; otherwise navigate to home.html
	const content = document.getElementById('content');
	if (content) {
		content.innerHTML = '<h1>Home</h1><p>Welcome to the home page.</p>';
	} else {
		window.location.href = 'home.html';
	}
}

function goIndex() {
	const content = document.getElementById('content');
	if (content) {
		content.innerHTML = '<h1>Index</h1><ul><li>Item 1</li><li>Item 2</li></ul>';
	} else {
		window.location.href = 'index.html';
	}
}

// Load another page or update content container. If a #content exists, fetch partials by name
function loadPage(page) {
	const content = document.getElementById('content');
	if (content) {
		// Try to fetch a partial (e.g., pages/about.html) then fallback to simple message
		fetch(page)
			.then((res) => {
				if (!res.ok) throw new Error('Not found');
				return res.text();
			})
			.then((html) => { content.innerHTML = html; })
			.catch(() => { content.innerHTML = '<h1>' + page + '</h1><p>Unable to load page.</p>'; });
	} else {
		window.location.href = page;
	}
}

// Handle AJAX-style form submissions: validate required fields and show result in #content or alert
function handleFormSubmit(event) {
	event.preventDefault();
	const form = event.target;
	// Simple required validation
	const invalid = Array.from(form.elements).some((el) => el.hasAttribute && el.hasAttribute('required') && !el.value);
	if (invalid) {
		const content = document.getElementById('content');
		const msg = '<p>Please fill in all required fields.</p>';
		if (content) content.innerHTML = msg; else alert('Please fill in all required fields.');
		return;
	}

	// Collect form data
	const data = new FormData(form);
	const obj = {};
	data.forEach((v, k) => { obj[k] = v; });

	// If form has data-target attribute, show result there; else show in #content
	const targetId = form.getAttribute('data-target');
	const resultHtml = '<h2>Form submitted</h2><pre>' + JSON.stringify(obj, null, 2) + '</pre>';
	if (targetId) {
		const target = document.getElementById(targetId);
		if (target) { target.innerHTML = resultHtml; return; }
	}
	const content = document.getElementById('content');
	if (content) content.innerHTML = resultHtml; else alert('Form submitted: ' + JSON.stringify(obj));
}

// Attach to buttons if present
document.addEventListener('DOMContentLoaded', function () {
	const homeBtn = document.getElementById('homeBtn');
	const indexBtn = document.getElementById('indexBtn');
	if (homeBtn) homeBtn.addEventListener('click', goHome);
	if (indexBtn) indexBtn.addEventListener('click', goIndex);
});

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { goHome, goIndex };
}
