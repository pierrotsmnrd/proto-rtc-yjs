import React, { Component, Suspense } from 'react';
import './App.css';
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import TextAreaBinding from './TextAreaBinding.js'


const ydoc = new Y.Doc()
const provider = new WebsocketProvider('ws://localhost:1234/', 'my-document-name', ydoc)
const ytext = ydoc.getText('textarea-content')


class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.binding = new TextAreaBinding(ytext, this.textareaRef)
  }

  textareaDidChange(event) {

    console.log(event)


  }

  render() {

    return (
      <div className="App">
        React App with Collaborative TextArea over Y.js <br />

        <textarea
          cols="80"
          rows="40"
          onChange={this.textareaDidChange}
          ref={(input) => {
            this.textareaRef = input
          }}
        />
      </div>
    );
  }
}


export default App;
