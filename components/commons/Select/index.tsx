import React, { InputHTMLAttributes, useState } from 'react';
import styles from 'components/commons/Select/style.module.scss';
import cn from 'classnames';

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    options: Option[];
    onChange: (value: string) => void;
}

const Select: React.FC<IProps> = ({ options, className, value, onChange, ...props }) => {
    const [open, setOpen] = useState<boolean>(false);

    const onToggleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className={cn(styles.select, {
            [styles.open]: open,
        }, className)}
        >
            <div className={styles.input}
                 onClick={onToggleOpen}
            >
                {options.find(({ value: _value }) => _value === value)?.label}
            </div>

            <div className={styles.overlay}
                 onClick={onToggleOpen}
            />
            <div className={styles.listWrapper}>
                <ul className={styles.list}>
                    {options.map(({ label, value }, index) => (
                        <li className={styles.item}
                            key={index}
                            onClick={_ => {
                                if (onChange) {
                                    onChange(value);
                                }
                                onToggleOpen();
                            }}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Select;
