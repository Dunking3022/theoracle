  import React from 'react';
  import axios from 'axios';
  import profileImage from './profile-image.png';
  import CanvasBackground from './CanvasBackground';
  import './ChatApp.css';
  import profileImageNew from './profile-image-new.png';
  window.name = "NULL";



  class ChatApp extends React.Component {

    

    constructor(props) {
      super(props);

      this.state = {
        messages: [],
        messageInput: ''
      };
    }

    handleMessageSubmit = async (e) => {
      e.preventDefault();
      const message = this.state.messageInput.trim();
      if (message) {
        const isUser = true; // assume message is from user
        const messages = [...this.state.messages, { text: message, isDefault: false, isUser }];
        this.setState({ messages, messageInput: '' });
    
        try {
          const chatResponse = await this.sendMessage(message);
          const messages = [...this.state.messages, { text: chatResponse, isDefault: true, isUser: false }];
          this.setState({ messages });
        } catch (error) {
          console.error(error);
          // Handle the error
        }
      }
    };
    
    
    sendMessage = async (userMessage) => {
      const openaiEndpoint = 'https://api.openai.com/v1/chat/completions';
      const openaiApiKey = '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';
      const model = 'gpt-3.5-turbo';
        
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      };
        
      const data = {
        'model': model,
        'messages': [{"role": "user", "content": userMessage}]
      };
    
      try {
        const response = await axios.post(openaiEndpoint, data, { headers });
        const chatResponse = response.data.choices[0].message.content;
        console.log(chatResponse);
        window.name = chatResponse;
        return chatResponse;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    

    handleMessageChange = (e) => {
      this.setState({ messageInput: e.target.value });
    };

    

    render() {
      return ( 
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh', 
          backgroundColor: 'black', 
          color: 'green',
          padding: '0em',
          overflow: 'hidden'
        }}>
          <h1 className='glowing-text' style={{ 
            marginTop: '0.3em', 
            fontFamily: 'Retro Font1', 
            fontSize: '3em', 
            textShadow: '1px 1px 4px #FFFFFF' ,
            
          }}>THE ORACLE</h1>

          <img className = 'glowing-image' src={profileImageNew} alt="Profile" style={{ height: '100px', width: '100px',  marginTop: '1em' }} />
      
          
          <div style={{ 
            height: '50vh',
            overflow: 'auto',
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-end', 
            alignItems: 'flex-start', 
            paddingBottom: '1em', 
            textAlign: 'left', 
            width: '100%', 
            paddingLeft: '1em' 
          }}>
            {this.state.messages.map((message, index) => (
    <div key={index} className={`message ${message.isDefault ? 'default' : ''}`} style={{ 

      marginBottom: '0.5em', 
      textAlign: message.isDefault ? 'right' : 'left', 
      fontFamily: 'Retro Font2', 
      fontSize: '1.5em', 
      textShadow: '1px 1px 2px #000000',
      padding: '1px',
      color: message.isDefault ? 'white' : 'green',
      alignSelf: message.isDefault ? 'flex-end' : 'auto',
      display: 'flex', 
      flexDirection: 'row-reverse',
      alignItems: 'center',
    }}>
      {!message.isUser && <img src={profileImage} alt="profile" style={{ height: '1.5em', width: '1.5em', borderRadius: '50%', marginRight: '0.5em' , padding: '3px'}} />}
      {message.text}
    </div>
  ))}

            </div>
          <form onSubmit={this.handleMessageSubmit} style={{ 
            marginBottom: '1em', 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'flex-start' 
          }}>
            <input
    type="text"
    placeholder="$"
    value={this.state.messageInput}
    onChange={this.handleMessageChange}
    style={{
      flex: 1,
      padding: '0.2em',
      textAlign: 'left',
      fontFamily: 'Retro Font2',
      fontSize: '1.5em',
      backgroundColor: '#808080',
      color: 'Black',
      border: 'none',
      outline: 'none',
      borderRadius: '20px',
      marginRight: '0.5em',
    }}
  />
            <button type="submit" style={{ display: 'none' }}>Send</button>
          </form>
        </div>
      );
    }
  }

  export default ChatApp;
