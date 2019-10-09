import React, { Component } from 'react'

class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {author: this.props.author, text: ''}
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value})
  }

  handleTextChange(e) {
    this.setState({text: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    const author = this.state.author.trim()
    const text = this.state.text.trim()
    if (!text || !author) {
      return
    }
    this.props.onCommentSubmit({p_id:this.props.p_id,author: author, text: text})
    this.setState({text: ''})
  }

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>

        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange.bind(this)}
        />
        <input type="submit" value="Post" />
      </form>
    )
  }
}

export default CommentForm