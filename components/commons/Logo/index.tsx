import React, { AnchorHTMLAttributes, useContext } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import cn from "classnames";
import { ThemeContext } from "lib/ThemeContext";
import { Theme } from "types/theme";

interface IProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const Logo: React.FC<IProps> = ({ className, ...props }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <Link href={"/"}>
            <a className={cn(styles.logo, className)} {...props}>
                <h1>
                    <picture>
                        <source
                            srcSet={
                                theme === Theme.LIGHT
                                    ? "/logo-dark.svg"
                                    : "/logo-light.svg"
                            }
                            media={"(min-width: 568px)"}
                        />

                        <img src={"/logo-mobile.svg"} alt={"kanban"} />
                    </picture>
                </h1>
            </a>
        </Link>
    );
};

export default Logo;
