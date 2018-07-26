import React from 'react'
import {render} from 'react-dom'
import {Stylesheet} from '../src'

function App(){
  return <Stylesheet href={require('./style.css')}>
      {/* this content shouldn't render
      until the stylesheet finishes loading */}
      <span className='big'>what up what up</span>
    </Stylesheet>
}

render(<App/>, window.app)