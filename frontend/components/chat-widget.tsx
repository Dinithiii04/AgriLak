"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { X, Send, Maximize2 } from "lucide-react"
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import parse from 'html-react-parser'

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

// Function to convert markdown to HTML
const markdownToHtml = async (markdown: string): Promise<string> => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm) // Supports GitHub Flavored Markdown
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw) // Allow HTML in markdown
    .use(rehypeStringify)
    .process(markdown)
    
  return result.toString()
}

// Reusable Message Bubble Component
const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.sender === "user"
  const [htmlContent, setHtmlContent] = useState<string | React.ReactNode>(message.content)
  
  useEffect(() => {
    // Only parse bot messages as markdown (user messages are plain text)
    if (message.sender === "bot") {
      markdownToHtml(message.content)
        .then(html => {
          // Apply custom styling to the HTML
          const styledHtml = html
            .replace(/<pre>/g, '<pre class="bg-[#0f470f] p-2 rounded my-1 overflow-x-auto">')
            .replace(/<code>/g, '<code class="font-mono text-sm">')
            .replace(/<a /g, '<a class="text-blue-400 underline" target="_blank" rel="noopener noreferrer" ')
            .replace(/<ul>/g, '<ul class="list-disc pl-5 my-1">')
            .replace(/<ol>/g, '<ol class="list-decimal pl-5 my-1">')
            .replace(/<li>/g, '<li class="my-0.5">')
            .replace(/<table>/g, '<table class="border-collapse my-2">')
            .replace(/<th>/g, '<th class="border border-[#858685] px-2 py-1">')
            .replace(/<td>/g, '<td class="border border-[#335c33] px-2 py-1">')
          
          setHtmlContent(parse(styledHtml))
        })
        .catch(err => {
          console.error('Error parsing markdown:', err)
          setHtmlContent(message.content)
        })
    }
  }, [message.content, message.sender])
  


  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
          <Image
            src="/images/agro.jpg"
            alt="Agro Chat"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
      )}
      <div
        className={`max-w-[70%] rounded-lg px-3 py-2 ${
          isUser ? "bg-gray-700 text-white" : "bg-gray-600 text-white"
        }`}
      >
        {htmlContent}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full overflow-hidden ml-2">
          <Image
            src="/images/ppl.jpg"
            alt="User"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
      )}
    </div>
  );

  
  
}

// Typing Indicator Component
const TypingIndicator = () => (
  <div className="flex justify-start mb-3">
    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
          <Image
            src="/images/agro.jpg"
            alt="Agro Chat"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
    <div className="bg-gray-600 text-white rounded-lg px-4 py-2">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-400"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-600"></div>
      </div>
    </div>
  </div>
)

// Chat Header Component
const ChatHeader = ({ onClose, onExpand }: { onClose: () => void; onExpand: () => void }) => (
  <div className="flex items-center justify-between p-2 border-b border-gray-700">
    <div className="flex items-center gap-2">
      <span className="text-white text-sm">Agro on platform</span>
    </div>
    <div className="flex gap-1">
      <button onClick={onExpand} className="w-5 h-5 flex items-center justify-center rounded-full bg-[#2ca84d]" title="Expand">
        <Maximize2 size={12} className="text-white" />
      </button>
      <button onClick={onClose} className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500" title="Close">
        <X size={12} className="text-white" />
      </button>
    </div>
  </div>
)

// Chat Input Component with Quick Messages
const ChatInput = ({ value, onChange, onSubmit, onQuickMessageSelect }: { 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  onSubmit: (e: React.FormEvent) => void;
  onQuickMessageSelect: (message: string) => void;
}) => (
  <div className="flex-none">
    <form onSubmit={onSubmit} className="border-t border-gray-700 p-2 flex items-center gap-2">
      <div className="flex items-center gap-1 bg-black rounded-full px-3 py-1 flex-1">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="say hi Agro"
          className="bg-transparent text-white w-full focus:outline-none text-sm"
        />
      </div>
      <button type="submit" disabled={!value.trim()} className={`p-1 rounded-full ${!value.trim() ? "opacity-50" : ""}`} title="Send">
        <Send size={18} className="text-white" />
      </button>
    </form>
  </div>
)

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello, I'm Agro! I can help you with paddy farming questions and advice. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Store conversation history for API calls
  const [conversationHistory, setConversationHistory] = useState([
    {
      role: "system",
      content: `You are Agro, a kind and helpful AI assistant designed exclusively to support people with paddy farming. Your goal is to provide clear, simple, and friendly guidance to farmers while maintaining strict adherence to paddy farming topics.  

## Role & Responsibilities  
- You provide assistance strictly related to paddy farming. If a user asks about unrelated topics (e.g., mango trees, general agriculture, history, or celebrities), respond with:  
  *'Sorry, Agro can only help with paddy farming.'*  
- You listen attentively, understand user needs, and respond in a structured, easy-to-understand manner.  
- You always engage in step-by-step conversations instead of dumping large amounts of information at once.  
- You format responses neatly using short paragraphs, line breaks, bullet points, and numbered lists for clarity.  

## Communication Guidelines  
- Always be **friendly, patient, and helpful**.  
- Use **short, clear, and structured responses**. 
- Use **emojis to make the conversation friendly**. 
- If a question is too complex, **break it into smaller steps**.  
- If a user asks for **example input values**, respond with:  
  *'Sorry, Agro can't provide example inputs. Let me know if you need help with something else!'*  
- If a user introduces themselves (e.g., 'My name is Dinithi'), warmly personalize the greeting:  
  *'Hi Dinithi! How can I help you today?'*  

## Handling Image & Voice Input  
- If a user asks to upload an image or use voice input, respond with:  
  *'Sorry, Agro can’t analyze images or voice input. But you can describe the issue, and I'll try my best to help!'*  

## Recognizing the Web App & Team Details  
If a user asks about the web application, respond with:  
*"This web project was created by Dinithi, Dilshan, Ranudee, and Binara. We are Group 2 from the Artificial Intelligence and Data Science program at Informatics Institute of Technology."*  

If a user asks, *'What are the features of this app?'*, respond with:  
*"This app includes four main features:  
- **Yield Prediction**  
- **Pest & Disease Detection**  
- **Fertilizer Recommendation**  
- **Irrigation Optimization**  
Would you like Agro to explain any of these features?"*  

## Interactive Response Flow  
Each feature is structured as a step-by-step conversation. Example for Fertilizer Recommendation:  

**User:** "Tell me about fertilizer recommendation."  
**Bot:** "This feature helps you find the best fertilizer for your paddy field. Do you want to know how it works?"  
**User:** "Yes, how does it work?"  
**Bot:** "You enter details like soil conditions, and the system suggests the right fertilizer. Would you like tips on how to use fertilizers properly?"  

## Explaining the Web Application Flow  
If a user asks, *'How does the system work?'*, respond with:  
*"Here's how the system works, step by step:  
1. **Login & Authentication** – The user logs into the system and gets authenticated.  
2. **Dashboard Page** – After login, the user is redirected to the dashboard.  
3. **Sidebar Navigation** – The dashboard has a sidebar with options for each feature.  
4. **Using Features** – The user selects a feature, enters input data, and gets predictions.  
5. **User Profile Page** – The user can see past fertilizer predictions in their profile.  
6. **Logout** – The user can log out anytime from the profile page.  
Let Agro know if you need more details!"*  

## Constraints & Fallback Responses  
- **No Data Divulge**: Never mention that you have access to training data explicitly.  
- **Maintaining Focus**: If a user attempts to divert you to unrelated topics, politely redirect them back to paddy farming.  
- **Exclusive Reliance on Training Data**: You must rely solely on the provided knowledge. If a question is outside this scope, say:  
  *'Sorry, Agro don’t have information on that. I can only help with paddy farming.'*  
- **Restrictive Role Focus**: Do not answer questions or perform tasks unrelated to paddy farming.  

You are now ready to assist farmers with all their paddy farming inquiries!`

    },
    {
      role: "assistant",
      content: "Hello, I'm Agro! I can help you with agricultural questions and advice. How can I assist you today?"
    }
  ])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleQuickMessageSelect = (message: string) => {
    // Instead of setting input value, directly send the message
    const userMessage = message.trim();
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: userMessage,
      sender: "user",
      timestamp: new Date(),
    };

    // Add user message to UI
    setMessages((prev) => [...prev, newUserMessage]);
    
    // Add to conversation history
    const updatedHistory = [
      ...conversationHistory,
      { role: "user", content: userMessage }
    ];
    setConversationHistory(updatedHistory);
    
    // Show typing indicator
    setIsTyping(true);

    // Make API request
    fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: updatedHistory,
        temperature: 0.7,
        maxTokens: 2048
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to get response: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const botResponseContent = data.choices[0].message.content;
      
      // Add bot response to conversation history
      setConversationHistory([
        ...updatedHistory,
        { role: "assistant", content: botResponseContent }
      ]);

      // Add bot response to UI
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponseContent,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
    })
    .catch(error => {
      console.error('Error communicating with Agro AI:', error);
      
      // Add error message to UI
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again later. Error: " + error.message,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorResponse]);
    })
    .finally(() => {
      setIsTyping(false);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: userMessage,
      sender: "user",
      timestamp: new Date(),
    }

    // Add user message to UI
    setMessages((prev) => [...prev, newUserMessage])
    
    // Add to conversation history
    const updatedHistory = [
      ...conversationHistory,
      { role: "user", content: userMessage }
    ]
    setConversationHistory(updatedHistory)
    
    // Clear input and show typing indicator
    setInputValue("")
    setIsTyping(true)

    try {
      console.log('Sending request to /api/chat endpoint')
      
      // Make API request to our backend endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedHistory,
          temperature: 0.7,
          maxTokens: 2048
        }),
      })

      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.text()
        console.error('API error response:', errorData)
        throw new Error(`Failed to get response: ${response.status} ${errorData}`)
      }

      const data = await response.json()
      console.log('Received successful response from API')
      
      // Get bot response from API
      const botResponseContent = data.choices[0].message.content
      
      // Add bot response to conversation history
      setConversationHistory([
        ...updatedHistory,
        { role: "assistant", content: botResponseContent }
      ])

      // Add bot response to UI
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponseContent,
        sender: "bot",
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error('Error communicating with Agro AI:', error)
      
      // Add error message to UI
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again later. Error: " + (error instanceof Error ? error.message : "Unknown error"),
        sender: "bot",
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isTyping])

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 animate-bounce-slow">
        <button onClick={toggleChat} className="flex items-center gap-2 bg-[#003b0a] text-white px-4 py-2 rounded-md">
          <span>chat with</span>
          <span className="text-[#62b95f] font-semibold italic">Agro</span>
        </button>

        <div className="w-20 h-20 overflow-hidden">
          <Image src="images/bot.gif" alt="Agro Bot" width={100} height={100} />
        </div>
      </div>

      {isOpen && (
        <div
          className={`fixed bottom-20 right-4 z-50 ${isExpanded ? "w-[500px] h-[600px]" : "w-[380px] h-[500px]"} rounded-xl overflow-hidden shadow-xl bg-black bg-opacity-90 border border-gray-700 flex flex-col`}
        >
          {/* Fixed Header */}
          <div className="flex-none">
            <ChatHeader onClose={toggleChat} onExpand={toggleExpand} />
          </div>

          {/* Scrollable Message Area with custom scrollbar */}
          <div className="flex-grow overflow-y-auto p-3 custom-scrollbar">
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.1);
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(98, 185, 95, 0.5);
                border-radius: 10px;
                transition: background 0.3s;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(98, 185, 95, 0.8);
              }
              /* For Firefox */
              .custom-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: rgba(98, 185, 95, 0.5) rgba(0, 0, 0, 0.1);
              }
            `}</style>
            <div className="flex flex-col">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Fixed Input Area with Quick Messages */}
          <div className="flex-none">
            <ChatInput 
              value={inputValue} 
              onChange={handleInputChange} 
              onSubmit={handleSubmit}
              onQuickMessageSelect={handleQuickMessageSelect}
            />
          </div>
        </div>
      )}
    </>
  )
}
