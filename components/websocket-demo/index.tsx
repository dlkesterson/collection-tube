import React, { useState, useCallback, useMemo, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const WebSocketDemo = () => {
    //Public API that will echo messages sent to it back to the client
    const messageHistory = useRef([]);

    const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:3080');

    const memoFunc = () => {
      console.log('lastmessage:');
      console.log(lastMessage);
      console.log('type is: ' + typeof lastMessage);
      return messageHistory.current.concat(lastMessage)
    };

    messageHistory.current = useMemo(
        memoFunc,
        [lastMessage]
    );

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
            {lastMessage ? <span>Last message: {JSON.parse(lastMessage.data).data.message}</span> : null}
            <ul className="h-32 overflow-y-auto w-full p-2 my-4 bg-gray-800 text-gray-100">
                {messageHistory.current.map((message, idx) => (
                    <li key={idx}>{message ? message.data : null}</li>
                ))}
            </ul>
        </div>
    );
};
