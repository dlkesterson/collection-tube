function Wrap({ className = '', children }) {
    return (
        <div
            className={`min-h-screen flex flex-col justify-start items-center bg-gray-900 py-3 px-8${
                className ? ' ' + className : ''
            }`}
        >
            {children}
        </div>
    );
}

export default Wrap;
