import React, { HTMLAttributes, useState } from 'react';
import styles from 'components/boards/BoardTitleBar/style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    on: boolean;
}

const BoardTitleBar: React.FC<IProps> = ({ on, className, children, ...props }) => {
    return (
        <div className={cn(styles.boardTitleBar, {
            [styles.on]: on,
        }, className)}
             {...props}
        >
            <div className={styles.title}>
                {children}
            </div>
            <img className={styles.icon}
                 src={'/icons/icon-chevron-down.svg'}
                 alt={''}
            />
        </div>
    );
};

export default BoardTitleBar;
