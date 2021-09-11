import React, {
    useState,
    useCallback,
    useEffect,
    useMemo,
    useRef
} from 'react';
import { motion } from 'framer-motion';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { FiActivity } from 'react-icons/fi';

const spring = {
    type: "easeIn",
    damping: 10,
    stiffness: 100,
    duration: 0.3
}

export const WebSocketDemo = () => {
    //Public API that will echo messages sent to it back to the client
    const messageHistory = useRef([]);
    const messageBox = useRef();
    const endOfMessageBox = useRef(null);

    const { sendMessage, lastJsonMessage, readyState } = useWebSocket(
        'ws://localhost:3080'
    );

    useEffect(() => {
        messageHistory.current.push(lastJsonMessage);

        if (messageHistory.current.length > 9) {
            messageHistory.current.shift();
        }
        endOfMessageBox?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest'
        });
    }, [lastJsonMessage]);

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
        <motion.div
            transition={spring}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-row flex-wrap mt-2">
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
            <ul
                ref={messageBox}
                className="flex-grow h-32 overflow-y-auto divide-y divide-gray-500 w-full p-2 mt-2 bg-gray-800 text-gray-100 font-mono"
            >
                {messageHistory.current &&
                    messageHistory.current.map((message, idx) => (
                        <li key={idx}>
                            <FiActivity className="mr-2 text-green-300 inline" />
                            {message && message.data
                                ? message.data.message
                                : null}
                        </li>
                    ))}
                <li key={'endOfMessageBox'} ref={endOfMessageBox}></li>
            </ul>
        </motion.div>
    );
};
