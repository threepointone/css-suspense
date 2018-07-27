css-suspense
---

loading css files, the suspense way. 

[(what is suspense?)](https://youtu.be/nLF0n9SACd4)

requirements
---

- *don't* inline css into the js bundle 
- while server rendering, inline `<link>` tags, [enabling progressive css](https://jakearchibald.com/2016/link-in-body/)
- on client side, suspend rendering till the css loads (with optional fallback ui)
- render synchronously if already loaded 

api
--- 

the api is a boring `Stylesheet` tag.

```jsx
<Stylesheet href='/path/to/style.css'>
  {/* this content will never load 
  until the stylesheet finishes loading */}
  <span className='big'>what up what up</span>
</Stylesheet>    
```


todo 
--- 

- unload styles that aren't used 
- tests etc etc 
