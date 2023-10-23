'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import io, { Socket } from 'socket.io-client'
let socket: Socket

export default function Home() {
  const [input, setInput] = useState('');

  useEffect(() => {
    const initializeSocket = async () => {
      await socketInitializer();
    };

    initializeSocket();
  }, []);


  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
    socket.emit('input-change', value);
  };

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    return () => {
      socket.close();
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to <a href="">GIF online converter</a>
      </h1>
      <input className={styles.input} onChange={onChangeHandler} />
    </main>
  )
}
