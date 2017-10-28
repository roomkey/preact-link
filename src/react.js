import {h} from 'preact'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class Link extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: Math.random() * 100000,
      willReceivePropsCount: 0
    }
  }
  componentWillReceiveProps({href}) {
    let hrefError
    if (this.props.href != href) hrefError = href + '!=' + this.props.href
    this.setState(({willReceivePropsCount}) => {
      let state = {willReceivePropsCount: ++willReceivePropsCount}
      if(hrefError) state.error = hrefError
      return state
    })
  }
  render({href, children}) {
    const {error} = this.state
    return (
      <a class="link" href={href}>
        {error &&
          <span>{error}</span>
        }
        {children}
      </a>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickCount: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    e.preventDefault()
    this.setState(({clickCount}) => ({
      clickCount: ++clickCount,
      message: 'test #' + clickCount
    }))
  }
  render(props) {
    const {message} = this.state
    return (
      <div>
        {message &&
          <div>{message}</div>
        }
        <div>
          <h1>Form</h1>
          <a onClick={this.handleClick}>init test</a>
          <Link href="/link-1">link #1</Link>
        </div>
        <div>
          <Link href="/link-2">link #2a</Link>
          <Link href="/link-2">link #2b</Link>
        </div>
      </div>
    )
  }
}

if (typeof window !== "undefined") {
  ReactDOM.render(<App />, document.getElementById("root"))
}