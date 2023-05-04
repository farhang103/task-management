import React, { ButtonHTMLAttributes } from 'react';
import styles from 'components/buttons/ThemeButton/style.module.scss';
import ToggleButton from 'components/buttons/ToggleButton/inde';
import cn from 'classnames';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    on: boolean;
}

const ThemeButton: React.FC<IProps> = ({ className, ...props }) => {
    return (
        <div className={cn(styles.themeButton)}>
            <img src={'/icons/icon-light-theme.svg'}
                 alt={'light theme'}
            />
            <ToggleButton {...props} />
            <img src={'/icons/icon-dark-theme.svg'}
                 alt={'dark theme'}
            />
        </div>
    );
};

export default ThemeButton;
