import React, { HTMLAttributes } from 'react';
import styles from 'components/boards/CardColumn/style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    column: Column;
}

const CardColumn: React.FC<IProps> = ({
                                          column: { name, color, tasks },
                                          className, children, ...props
                                      }) => {
    return (
        <div className={cn(styles.cardColumn, className)}
             {...props}
        >
            <div className={styles.title}>
                <span className={styles.circle}
                style={{
                    background: color,
                }}
                />{name} ({tasks?.length})
            </div>

            <ul className={styles.cardList}>
                {children}
            </ul>
        </div>
    );
};

export default CardColumn;
