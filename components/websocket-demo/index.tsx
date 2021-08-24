import React, { useState, useCallback, useMemo, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const WebSocketDemo = () => {
    //Public API that will echo messages sent to it back to the client
    const [socketUrl, setSocketUrl] = useState('ws://localhost:3080');
    const messageHistory = useRef([]);

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    messageHistory.current = useMemo(
        () => messageHistory.current.concat(lastMessage),
        [lastMessage]
    );

    if (messageHistory.current.length > 99) messageHistory.current.length = 99;

    const handleClickChangeSocketUrl = useCallback(
        () => setSocketUrl('wss://echo.websocket.org'),
        []
    );

    const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated'
    }[readyState];

    return (
        <div>
            <button onClick={handleClickChangeSocketUrl}>
                Click Me to change Socket Url
            </button>
            <button
                onClick={handleClickSendMessage}
                disabled={readyState !== ReadyState.OPEN}
            >
                Click Me to send 'Hello'
            </button>
            <span>The WebSocket is currently {connectionStatus}</span>
            {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
            <ul className="h-4 overflow-y-auto w-full p-2 my-4">
                {messageHistory.current.map((message, idx) => (
                    <li key={idx}>{message ? message.data : null}</li>
                ))}
            </ul>
        </div>
    );
};
