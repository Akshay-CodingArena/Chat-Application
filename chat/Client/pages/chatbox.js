import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRef,useEffect, useState } from 'react'

export default function Chatbox({socket}) {
  const [messageList,setMessage] = useState(null)
  const inpref = useRef()
  
 
  const sendMessage = async (e)=>{
    e.preventDefault()
    const data={
      message:inpref.current.value,
      time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    }
    if(messageList!=null){
        setMessage([...messageList,data])
        console.log("My list is",messageList)
      }
      else{
        setMessage([data])
      }

      data["side"]="right"
      if(messageList!=null){
        setMessage([...messageList,data])
        console.log("My list is",messageList)
      }
      else{
        setMessage([data])
      }
      console.log("Hello",inpref.current.value)
      socket.emit("send_message",data)
      
  }
  

    socket.on("receive_message",(data)=>{
      data['side']="left"
      console.log("Received",data,"List",messageList)
      if(messageList!=null){
        setMessage([...messageList,data])
        console.log("My list is",messageList)
      }
      else{
        setMessage([data])
      }
      
    })



  return (
  <div className={styles.container}>
    <h1 style={{color:'white'}}>We<span style={{color:'blue'}}>Chat</span></h1>
    <div className={styles.box}>
    {messageList?.map(item=>(
        <div className={`${item.side=="left"?styles.left:styles.right} ${styles.message}`}>
        {item.message}
        </div>
        ))}
      

      
    </div>
    <div className={styles.send}>
    <div  className={styles.sendMessage} id="send-container">
      <input ref={inpref} id="messageInp" className={styles.sendInput} /><button  onClick={sendMessage} className={styles.sendButton}>Send</button>
    </div>
    </div>
  </div>
  )
}
