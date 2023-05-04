import React, { HTMLAttributes } from 'react';
import BoardTitleBar from 'components/boards/BoardTitleBar';
import { useAppStore } from 'lib/store';
import { useRouter } from 'next/router';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const BoardTitleBarContainer: React.FC<IProps> = (props) => {
    const { query } = useRouter();
    const { id } = query;
    const { boards, toggleSidebar, showSidebar } = useAppStore();

    const onToggleOpen = () => {
        toggleSidebar();
    };

    return (
        <div {...props}>
            <BoardTitleBar on={showSidebar}
                           onClick={onToggleOpen}
            >
                {boards.find(({ id: _id }) => _id === Number(id))?.name}
            </BoardTitleBar>
        </div>
    );
};

export default BoardTitleBarContainer;
