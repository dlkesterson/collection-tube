function Wrap({ className = '', children }) {
    return (
        <div
            className={`min-h-screen flex flex-col justify-center items-center bg-gray-900${
                className ? ' ' + className : ''
            }`}
        >
            {children}
        </div>
    );
}

export default Wrap;
