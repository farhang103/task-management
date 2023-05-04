import React, { useEffect, useState } from 'react';
import Sidebar from 'components/commons/Sidebar';
import { useAppStore } from 'lib/store';
import { useRouter } from 'next/router';
import { ModalID } from 'types/modal';

const SidebarContainer: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { boards, closeSidebar, toggleSidebar, showSidebar, openModal } = useAppStore();
    const [activeBoardId, setActiveBoardId] = useState(1);

    const onCreateNewBoard = () => {
        openModal(ModalID.ADD_NEW_BOARD);

        if (window.innerWidth < 767) {
            closeSidebar();
        }
    };

    useEffect(() => {
        if (!id) {
            setActiveBoardId(1);
            return ;
        }

        setActiveBoardId(Number(id));
    }, [id]);

    return (
        <Sidebar open={showSidebar}
                 toggleSidebar={toggleSidebar}
                 onCreateNewBoard={onCreateNewBoard}
                 boards={boards}
                 activeBoardId={activeBoardId}
        />
    );
};

export default SidebarContainer;
