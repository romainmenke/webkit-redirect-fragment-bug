import http from 'http';

function index() {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Index</title>
</head>
<body>
	<a href="/redirect#alpha">Alpha</a>
	<a href="/redirect#beta">Beta</a>
	<a href="/redirect#gamma">Gamma</a>
</body>
</html>
`
}

function result() {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Index</title>
</head>
<body>
	<div id=result></div>

	<a href="http://localhost:8080/redirect#alpha">Alpha</a>
	<a href="http://localhost:8080/redirect#beta">Beta</a>
	<a href="http://localhost:8080/redirect#gamma">Gamma</a>

	<script>result.innerHTML = window.location.hash</script>
</body>
</html>
`
}

const serverA = http.createServer(async (req, res) => {
	const parsedUrl = new URL(req.url, 'http://localhost:8080');
	const pathname = parsedUrl.pathname;
	switch (pathname) {
		case '/':
			res.setHeader('Content-Type', 'text/html');
			res.writeHead(200);
			res.end(index());
			return;
		case '/redirect':
			res.setHeader('Location', 'http://localhost:8081');
			res.writeHead(301);
			res.end();
			return;
	}
});

serverA.timeout = 100;
serverA.listen(8080);

const serverB = http.createServer(async (req, res) => {
	const parsedUrl = new URL(req.url, 'http://localhost:8080');
	const pathname = parsedUrl.pathname;
	switch (pathname) {
		case '/':
			res.setHeader('Content-Type', 'text/html');
			res.writeHead(200);
			res.end(result());
			return;
	}
});

serverB.timeout = 100;
serverB.listen(8081);

console.log('visit: http://localhost:8080');
