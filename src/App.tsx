import React, { Component, Suspense } from 'react';
import './App.css';
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import TextAreaBinding from './TextAreaBinding'

const ydoc = new Y.Doc()
const provider = new WebsocketProvider('ws://localhost:1234/', 'my-document-name', ydoc)
const ytext = ydoc.getText('textarea-content')

class App extends Component {

  private textAreaEl: any;
  private binding: any;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    console.log("App:componentDidMount:", this.textAreaEl)
    this.binding = new TextAreaBinding(ytext, this.textAreaEl)
  }

  private textareaDidChange(event: any) {
    console.log("App:textareaDidChange :", event)
  }

  public render() {
    return (
      <div className="App">
        <textarea
          cols={80}
          rows={40}
          onChange={this.textareaDidChange}
          ref={(input) => { this.textAreaEl = input }}
        />
      </div>
    );
  }
}
export default App;