import React, { HTMLAttributes } from 'react';
import styles from 'components/commons/Header/style.module.scss';
import Container from 'components/commons/Container';
import cn from 'classnames';
import Logo from 'components/commons/Logo';
import BoardOptionButtonContainer from 'containers/boards/BoardOptionButtonContainer';
import BoardTitleBarContainer from 'containers/boards/BoardTitleBarContainer';
import { useAppStore } from 'lib/store';

interface IProps extends HTMLAttributes<HTMLHeadElement> {

}

const Header: React.FC<IProps> = ({ className, ...props }) => {
    const { showSidebar } = useAppStore();

    return (
        <header className={cn(styles.header, {
            [styles.sidebar]: showSidebar,
        }, className)}
                {...props}
        >
            <Container className={styles.container}>
                <div className={styles.leftSide}>
                    <Logo className={styles.logo} />
                    <div className={styles.divider} />
                    <BoardTitleBarContainer />
                </div>

                <BoardOptionButtonContainer className={styles.buttonContainer} />
            </Container>
        </header>
    );
};

export default Header;
