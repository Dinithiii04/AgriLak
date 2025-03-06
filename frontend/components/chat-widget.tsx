"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { X, Send, Maximize2 } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi Agro!",
      sender: "user",
      timestamp: new Date(),
    },
    {
      id: "2",
      content: "Hey there! It's great to connect. How are you doing today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm just a demo bot. Your message was received!",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 animate-bounce-slow">
        <button onClick={toggleChat} className="flex items-center gap-2 bg-[#003b0a] text-white px-4 py-2 rounded-md">
          <span>chat with</span>
          <span className="text-[#62b95f] font-semibold italic">Agro</span>
        </button>

        <div className="w-20 h-20 overflow-hidden">
          <Image src="images/chatbot.gif" alt="Agro Bot" width={100} height={100} />
        </div>
      </div>

      {isOpen && (
        <div
          className={`fixed bottom-20 right-4 z-50 ${isExpanded ? "w-[500px] h-[600px]" : "w-[380px] h-[500px]"} rounded-xl overflow-hidden shadow-xl bg-black bg-opacity-90 border border-gray-700`}
        >
          <div className="flex items-center justify-between p-2 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <Image src="images/agro.jpg" alt="Agro Bot" width={20} height={20} className="rounded-full" />
              <span className="text-white text-sm">Agro on platform</span>
            </div>
            <div className="flex gap-1">
              <button onClick={toggleExpand} className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-500">
                <Maximize2 size={12} className="text-white" />
              </button>
              <button onClick={toggleChat} className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500">
                <X size={12} className="text-white" />
              </button>
            </div>
          </div>

          <div className="h-[85%] overflow-y-auto p-3 flex flex-col gap-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                {message.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white mr-2">
                    A
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-lg px-3 py-2 ${
                    message.sender === "user" ? "bg-gray-700 text-white" : "bg-gray-600 text-white"
                  }`}
                >
                  {message.content}
                </div>
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white ml-2">
                    F
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white mr-2">
                  A
                </div>
                <div className="bg-gray-600 text-white rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-gray-700 p-2 flex items-center gap-2">
            <div className="flex items-center gap-1 bg-black rounded-full px-3 py-1 flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="say hi Agro"
                className="bg-transparent text-white w-full focus:outline-none text-sm"
              />
            </div>
            <button type="submit" disabled={!inputValue.trim()} className={`p-1 rounded-full ${!inputValue.trim() ? "opacity-50" : ""}`}>
              <Send size={18} className="text-white" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
