import React, { HTMLAttributes } from 'react';
import styles from 'components/boards/ColumnBoard/style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLUListElement> {

}

const ColumnBoard: React.FC<IProps> = ({ className, children, ...props }) => {
    return (
        <ul className={cn(styles.columnBoard, className)}
            {...props}
        >
            {children}
        </ul>
    );
};

export default ColumnBoard;
