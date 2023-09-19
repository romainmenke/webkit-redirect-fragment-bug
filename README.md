Steps :

- clone this repo
- node ./server.mjs
- visit http://localhost:8080
- click the links
- you should always see `#alpha` after clicking `Alpha`, `#beta` after clicking `Beta`, etc.

In Safari however the fragment appears to be cached.  
So click `Beta` after already having clicked `Alpha` redirects to `/#alpha` instead of `/#beta`.

------

What `server.mjs` does is :
- render a list of links to `http://localhost:8080/redirect#<some fragment>`
- redirect any request on `http://localhost:8080/redirect` to `http://localhost:8081`
- render the same list and the url fragment on `http://localhost:8081`

