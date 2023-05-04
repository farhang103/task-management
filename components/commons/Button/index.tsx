import React, { ButtonHTMLAttributes } from 'react';
import styles from 'components/commons/Button/style.module.scss';
import cn from 'classnames';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    icon?: string;
    round?: boolean;
}

const Button: React.FC<IProps> = ({ variant, icon, round, className, children, ...props }) => {
    return (
        <button className={cn(styles.button, {
            [styles.mobileIcon]: icon,
            [styles.round]: round,
            [styles.primary]: variant === 'primary',
            [styles.secondary]: variant === 'secondary',
            [styles.danger]: variant === 'danger',
        }, className)}
                type={'button'}
                {...props}
        >
            <div className={styles.content}>
                {children}
            </div>
            {icon && (
                <img className={styles.icon}
                     src={icon}
                     alt={''}
                />
            )}
        </button>
    );
};

Button.defaultProps = {
    variant: 'primary',
};

export default Button;
