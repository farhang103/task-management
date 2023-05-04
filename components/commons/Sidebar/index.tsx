import React, { HTMLAttributes } from 'react';
import styles from 'components/commons/Sidebar/style.module.scss';
import cn from 'classnames';
import ThemeButtonContainer from 'containers/commons/ThemeButtonContainer';
import Link from 'next/link';
import Logo from 'components/commons/Logo';
import HideSidebarIcon from '/public/icons/icon-hide-sidebar.svg';
import ShowSidebarIcon from '/public/icons/icon-show-sidebar.svg';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    open: boolean;
    toggleSidebar: () => void;
    boards: Board[];
    activeBoardId: number;
    onCreateNewBoard: () => void;
}

const Sidebar: React.FC<IProps> = ({
                                       open, toggleSidebar, boards, activeBoardId,
                                       onCreateNewBoard, className, ...props
                                   }) => {
    return (
        <div className={cn(styles.sidebarWrapper, {
            [styles.open]: open,
        }, className)}
             {...props}
        >
            <nav className={styles.sidebar}>
                <div className={styles.overlay}
                     onClick={toggleSidebar}
                />

                <div className={styles.box}>
                    <div className={styles.header}>
                        <Logo />
                    </div>
                    <div className={styles.body}>
                        <div className={styles.title}>
                            All Boards ({boards.length})
                        </div>
                        <ul className={styles.boardList}>
                            {boards.map(({ id, name }) => (
                                <li className={cn({
                                    [styles.active]: id === activeBoardId,
                                })}
                                    key={id}
                                >
                                    <Link href={`/?id=${id}`}>
                                        <a>
                                            {name}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                            <li className={styles.createNewBoard}
                                onClick={onCreateNewBoard}
                            >
                                + Create New Board
                            </li>
                        </ul>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.themeButtonContainer}>
                            <ThemeButtonContainer />
                        </div>
                        <button className={styles.hideSidebarButton}
                                onClick={toggleSidebar}
                                type={'button'}
                        >
                            <HideSidebarIcon />
                            Hide Sidebar
                        </button>
                    </div>
                </div>
            </nav>

            <button className={styles.showSidebarButton}
                    onClick={toggleSidebar}
                    type={'button'}
            >
                <ShowSidebarIcon />
            </button>
        </div>
    );
};

export default Sidebar;
