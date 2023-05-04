import React, { ButtonHTMLAttributes, useState } from "react";
import styles from "components/commons/DropdownButton/style.module.scss";
import cn from "classnames";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    open: boolean;
    toggleOpen: () => void;
    icon: string;
    height?: string;
}

const DropdownButton: React.FC<IProps> = ({
    open,
    toggleOpen,
    icon,
    className,
    children,
    height,
    ...props
}) => {
    return (
        <div
            className={cn(
                styles.dropdownButton,
                {
                    [styles.open]: open,
                },
                className
            )}
        >
            <div className={styles.overlay} onClick={toggleOpen} />
            <button
                className={styles.button}
                onClick={toggleOpen}
                type={"button"}
                {...props}
            >
                <img
                    className={styles.icon}
                    src={icon}
                    alt={""}
                    style={{
                        height,
                    }}
                />
            </button>

            <div className={styles.listWrapper}>
                <ul className={styles.list}>{children}</ul>
            </div>
        </div>
    );
};

export default DropdownButton;
