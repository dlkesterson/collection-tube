import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const WebSocketDemo = () => {
    //Public API that will echo messages sent to it back to the client
    const messageHistory = useRef([]);

    const { sendMessage, lastJsonMessage, readyState } = useWebSocket('ws://localhost:3080');

    useEffect(() => {
        console.log('type of messageHistory curent : ' + typeof messageHistory.current);
        console.log(messageHistory.current);
        if (messageHistory.current.length > 9) {
          
          console.log('messageHistory.current.length > 9');
          messageHistory.current.shift();
        }

        messageHistory.current.push(lastJsonMessage);
  
        console.log('length is now: '+ messageHistory.current.length);
    }, [lastJsonMessage])

    // const memoFunc = () => {
    //   console.log('lastmessage:');
    //   console.log(lastJsonMessage);
    //   console.log('type is: ' + typeof lastJsonMessage);
    //   console.log('type of messageHistory curent : ' + typeof messageHistory.current);
    //   console.log(messageHistory.current);
    //   if (messageHistory.current.length > 10) {
        
    //     console.log('messageHistory.current.length > 10');
    //     messageHistory.current.shift();
    //     // delete messageHistory.current[0];
    //   }

    //   console.log('length is now: '+ messageHistory.current.length);
    //   messageHistory.current.push(lastJsonMessage)

    //   return;
    // };

    // messageHistory.current = useMemo(
    //     memoFunc,
    //     [lastJsonMessage]
    // );

    const handleClickSendMessage = useCallback(() => {
      sendMessage(JSON.stringify({ message: 'hello!' }));
      // return;
    }, []);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated'
    }[readyState];

    return (
        <div>
            <button
                onClick={handleClickSendMessage}
                disabled={readyState !== ReadyState.OPEN}
            >
                Click Me to send 'Hello'
            </button>
            <span>The WebSocket is currently {connectionStatus}</span>
            {lastJsonMessage && lastJsonMessage.data ? <span>Last message: {lastJsonMessage.data.message}</span> : null}
            <ul className="h-32 overflow-y-auto w-full p-2 my-4 bg-gray-800 text-gray-100">
                {messageHistory.current.map((message, idx) => (
                    <li key={idx}>{message ? message.data.message : null}</li>
                ))}
            </ul>
        </div>
    );
};
