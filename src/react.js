import React from 'react'
import ReactDOM from 'react-dom'

class Link extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      href: props.href,
      willReceivePropsCount: 0
    }
  }
  componentComponentWillReceiveProps({href}) {
    let hrefError
    if (this.state.href != href) hrefError = 'ERROR'
    this.setState(({willReceivePropsCount}) => {
      let state = {willReceivePropsCount: ++willReceivePropsCount}
      if(hrefError) state.error = hrefError
      return state
    })
  }
  render() {
    const {href, children} = this.props,
          {error} = this.state
    return (
      <a style={{display: 'block'}} href={href}>
        {error &&
          <span>{error}</span>
        }<br/>
        prop.href: {href} <br/>
        state.href: {this.state.href}
      </a>
    )
  }
}

class App extends React.Component {
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
  render() {
    const {message} = this.state
    return (
      <div>
        {message &&
          <div>{message}</div>
        }
        <div>
          <h1>Form</h1>
          <button style={{display: 'block'}} onClick={this.handleClick}>init test</button>
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
