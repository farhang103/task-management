import React, { HTMLAttributes, useState } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import { ColorResult, TwitterPicker } from 'react-color';

interface IProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
}

const ColorSelect: React.FC<IProps> = ({ value, onChange, className, ...props }) => {
    const [open, setOpen] = useState<boolean>(false);

    const onOpenToggle = () => {
        setOpen(!open);
    };

    const onChangeComplete = (color: ColorResult) => {
        const { hex } = color;
        onChange(hex);
        onOpenToggle();
    };

    return (
        <div className={cn(styles.colorSelect, {
            [styles.open]: open,
        }, className)}
             {...props}
        >
            <div className={styles.overlay}
                 onClick={onOpenToggle}
            />
            <div className={styles.colorChip}
                 onClick={onOpenToggle}
                 style={{
                     background: value,
                 }}
            />
            <TwitterPicker className={styles.colorPicker}
                           onChangeComplete={onChangeComplete}
            />
        </div>
    );
};

export default ColorSelect;
