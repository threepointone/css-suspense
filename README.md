css-suspense
---

loading css files, the suspense way. 

[(what is suspense?)](https://www.youtube.com/watch?v=v6iR3Zk4oDY)

requirements
---

- *don't* inline css into the js bundle 
- while server rendering, inline `<link>` tags, [enabling progressive css](https://jakearchibald.com/2016/link-in-body/)
- on client side, suspend rendering till the css loads (with optional fallback ui)
- render synchronously if already loaded 

api
--- 

the api is... a link tag! 

jsx```
<Link href={require('./style.css')}>
  {/* this content will never load 
  until the stylesheet finishes loading */}
  <span className='big'>what up what up</span>
</Link>    
```
