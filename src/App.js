import React, { Component } from 'react';
import marked from 'marked';
import './App.css';

var iniState = "Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*'";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {input : iniState}
  }
  onUpdate=(val) =>{
    this.setState({
      input : val
    });
  };

  render() {
    return (
      <div className="row">
        <h1 className="text-primary text-center">Markdown Preview</h1>
        <div className="col-md-6">
          <Editor onUpdate={this.onUpdate}/>
        </div>
        <div className="col-md-6">
          <Previewer value={this.state.input}/>
        </div>
      </div>
    );
  }
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: iniState};

    this.handleChange =    this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState(
      {value : event.target.value});
    this.props.onUpdate(event.target.value);
  }
  render() {
    return (
      <div className="edit">
        <textarea rows="22" type="text"
          ref="inputValue"
          className="form-control"
          value={this.state.value}
          onChange={this.handleChange}
          id="edit">
        </textarea>
      </div>
    );
  }
}

class Previewer extends React.Component{
  constructor(props){
    super(props);

  }
  createMarkup(){
    return {__html: marked(this.props.value, {sanitize: true})};
  }
  render(){
    return(
      <div className = "well prev">
        <span id="mark"
          dangerouslySetInnerHTML={this.createMarkup()}>
        </span>
      </div>
    );
  }
}


export default App;
