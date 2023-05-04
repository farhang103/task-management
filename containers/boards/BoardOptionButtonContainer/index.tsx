import React, { HTMLAttributes, useMemo, useState } from 'react';
import DropdownButton from 'components/commons/DropdownButton';
import Button from 'components/commons/Button';
import { useAppStore } from 'lib/store';
import { useRouter } from 'next/router';
import { ModalID } from 'types/modal';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const BoardOptionButtonContainer: React.FC<IProps> = (props) => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const { boards, openModal } = useAppStore();
    const router = useRouter();
    const { query: { id } } = router;
    const currentBoard = useMemo(() => {
        return boards.find((({ id: _id }) => _id === Number(id)));
    }, [id, boards]);

    const toggleOpenMenu = () => {
        setOpenMenu(!openMenu);
    };

    const onAddNewTask = () => {
        openModal(ModalID.ADD_NEW_TASK);
    };

    const onEditBoard = () => {
        openModal(ModalID.EDIT_BOARD);
        toggleOpenMenu();
    };

    const onDeleteBoard = () => {
        if (boards.length === 1) {
            return;
        }

        openModal(ModalID.DELETE_BOARD);
        toggleOpenMenu();
    };

    return (
        <div {...props}>
            <Button icon={'/icons/icon-add-task-mobile.svg'}
                    round
                    disabled={currentBoard?.columns?.length === 0}
                    onClick={onAddNewTask}
            >
                + Add New Task
            </Button>

            <DropdownButton open={openMenu}
                            toggleOpen={toggleOpenMenu}
                            icon={'/icons/icon-vertical-ellipsis.svg'}
            >
                <li onClick={onEditBoard}>
                    Edit Board
                </li>
                <li onClick={onDeleteBoard}
                    aria-disabled={boards.length === 1}
                    style={{
                        color: 'var(--theme-danger-color)'
                    }}
                >
                    Delete Board
                </li>
            </DropdownButton>
        </div>
    );
};

export default BoardOptionButtonContainer;
