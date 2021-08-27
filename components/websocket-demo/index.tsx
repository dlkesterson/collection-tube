import React, {
    useState,
    useCallback,
    useEffect,
    useMemo,
    useRef
} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const WebSocketDemo = () => {
    //Public API that will echo messages sent to it back to the client
    const messageHistory = useRef([]);

    const { sendMessage, lastJsonMessage, readyState } = useWebSocket(
        'ws://localhost:3080'
    );

    useEffect(() => {
        console.log(
            'type of messageHistory curent : ' + typeof messageHistory.current
        );
        console.log(messageHistory.current);
        if (messageHistory.current.length > 9) {
            console.log('messageHistory.current.length > 9');
            messageHistory.current.shift();
        }

        messageHistory.current.push(lastJsonMessage);

        console.log('length is now: ' + messageHistory.current.length);
    }, [lastJsonMessage]);

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
        <div className="flex flex-row flex-wrap">
            <button
                className="rounded-full bg-gray-500 text-gray-50 hover:bg-gray-600 transition text-sm py-1 px-3 mx-4"
                onClick={handleClickSendMessage}
                disabled={readyState !== ReadyState.OPEN}
            >
                Test Connection
            </button>
            <p className="text-sm uppercase text-gray-600 my-2 mx-4 tracking-wide">
                Status:{' '}
                <span className="font-bold text-gray-800">
                    {connectionStatus}
                </span>
            </p>
            {lastJsonMessage && lastJsonMessage.data ? (
                <p className="text-sm text-gray-800 my-2 mx-4">
                    Last message: {lastJsonMessage.data.message}
                </p>
            ) : null}
            <ul className="flex-grow h-32 overflow-y-auto w-full p-2 my-4 bg-gray-800 text-gray-100 font-mono">
                {messageHistory.current.map((message, idx) => (
                    <li key={idx}>{message ? message.data.message : null}</li>
                ))}
            </ul>
        </div>
    );
};
