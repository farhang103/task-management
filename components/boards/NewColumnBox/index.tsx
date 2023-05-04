import React, { HTMLAttributes } from 'react';
import styles from 'components/boards/NewColumnBox/style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const NewColumnBox: React.FC<IProps> = ({ className, ...props }) => {
    return (
        <div className={cn(styles.newColumnBox, className)}
             {...props}
        >
            + New Column
        </div>
    );
};

export default NewColumnBox;
