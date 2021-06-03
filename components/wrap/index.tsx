function Wrap({ className = '', inlineStyle = {}, children }) {
    return (
        <div
            className={`flex flex-grow flex-col justify-start items-center py-2 px-8${
                className ? ' ' + className : ''
            }`}
            style={inlineStyle ? inlineStyle : {}}
        >
            {children}
        </div>
    );
}

export default Wrap;
