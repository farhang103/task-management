import React, { ButtonHTMLAttributes } from "react";
import styles from "components/buttons/ToggleButton/style.module.scss";
import cn from "classnames";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    on: boolean;
}

const ToggleButton: React.FC<IProps> = ({ on, className, ...props }) => {
    return (
        <button
            className={cn(
                styles.toggleButton,
                {
                    [styles.on]: on,
                },
                className
            )}
            type={"button"}
            {...props}
        />
    );
};

export default ToggleButton;
