
import { ReactNode } from 'react';

interface ContainerProps {
    className: string;
    children?: ReactNode;
}

function Container({ className = '', children }: ContainerProps) {
    return (
        <div className={'container mx-auto px-8 ' + className}>{children}</div>
    );
}

export default Container;
