import io from 'socket.io-client'
import { useEffect } from 'react'
import Chatbox from './chatbox'

const socket = io.connect("http://localhost:3001")
export default function Home(){
  
  useEffect(()=>{
    if(typeof prompt != "undefined"){
      console.log(typeof prompt)
      const name = prompt("Enter your name")
      socket.emit("join_chat","MyRoom")
      
  }},[])

  return <Chatbox socket={socket}/>
}