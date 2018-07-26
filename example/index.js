import React from 'react'
import {render} from 'react-dom'
import {Link} from '../src'

function App(){
  return <Link href={require('./style.css')}>
      {/* this content shouldn't render
      until the stylesheet finishes loading */}
      <span className='big'>what up what up</span>
    </Link>
}

render(<App/>, window.app)