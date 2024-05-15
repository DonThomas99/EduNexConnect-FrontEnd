import { message } from "../Models/assignments";

export function generateAndScrollChatHTML(chatContainer:HTMLElement |null,messages:message[],senderId:string):void{
    let chatHTML = '<div class="messageContainer">';

  messages.forEach((message) => {
    const isTeacherMessage = message.sender === senderId;
    const chatClass = isTeacherMessage? 'chat chat-start' : 'chat chat-end';
    chatHTML += `
      <div class="${chatClass}">
        <div class="chat-bubble">${message.text}</div>
      </div>`;
  });

  chatHTML += '</div>';

  if (chatContainer) {
    chatContainer.innerHTML = chatHTML;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  } else {
    console.log('chat Container element not found');
  }
}