'use client';

import React, { useEffect, useState } from 'react';
import { ConnectionState } from '@/shared/ui/ConnectionState';
import { ConnectionManager } from '@/shared/ui/ConnectionManager';
import { socket } from '@/shared/socket';
import FrameViewer, { IGifFrame } from '@/widgets/FrameViewer';


export default function Home() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [data, setData] = useState<IGifFrame>();
  const [allGifs, setAllGifs] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('allgifs', setAllGifs);
    socket.on('frame', setData);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('allgifs', setAllGifs);
      socket.off('frame', setData);
    };
  }, []);

  const onNextClick = () => {
    socket.emit('next');
  };

  const onChangeGif = (e: React.ChangeEvent<HTMLSelectElement>) => {
    socket.emit('gif', e.target.value);
  };

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />
      <select onChange={onChangeGif}>
        {allGifs.map(gif => (
          <option key={gif.id} value={gif.id}>{gif.name}</option>
        ))}
      </select>
      <FrameViewer data={data} onNext={onNextClick} />
    </div>
  );
}
