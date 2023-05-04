import React, { InputHTMLAttributes } from 'react';
import styles from 'components/commons/CheckBox/style.module.scss';
import cn from 'classnames';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {

}

const CheckBox: React.FC<IProps> = ({
                                        className, id, children,
                                        checked, ...props
                                    }) => {
    return (
        <label className={cn(styles.checkBox, {
            [styles.checked]: checked,
        }, className)}
               htmlFor={id}
        >
            <input className={styles.input}
                   type={'checkbox'}
                   id={id}
                   checked={checked}
                   {...props}
            />
            {children} {checked}
        </label>
    );
};

export default CheckBox;
