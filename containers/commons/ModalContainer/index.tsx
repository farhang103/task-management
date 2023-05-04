import React, { useEffect } from 'react';
import Modal from 'components/commons/Modal';
import { useAppStore } from 'lib/store';
import { ModalID } from 'types/modal';
import AddNewBoardFormContainer from 'containers/forms/AddNewBoardFormContainer';
import DeleteBoardFormContainer from 'containers/forms/DeleteBoardFormContainer';
import EditBoardFormContainer from 'containers/forms/EditBoardFormContainer';
import AddNewTaskFormContainer from 'containers/forms/AddNewTaskFormContainer';
import TaskDetailFormContainer from 'containers/forms/TaskDetailFormContainer';
import DeleteTaskFormContainer from 'containers/forms/DeleteTaskFormContainer';
import { useRouter } from 'next/router';
import EditTaskFormContainer from 'containers/forms/EditTaskFormContainer';

const ModalContainer: React.FC = () => {
    const { modalId, showModal, closeModal, openModal } = useAppStore();
    const router = useRouter();
    const { pathname, query: { id, taskId } } = router;

    const onCloseModal = () => {
        if (id && taskId) {
            router.push({
                pathname,
                query: {
                    id,
                },
            }, undefined, {
                scroll: false,
            });
        }
        closeModal();
    };

    useEffect(() => {
        if (!id || !taskId) {
            return;
        }

        openModal(ModalID.TASK_DETAIL);
    }, [id, taskId]);

    return (
        <Modal open={showModal}
               closeModal={onCloseModal}
        >
            {modalId === ModalID.ADD_NEW_BOARD && (<AddNewBoardFormContainer />)}
            {modalId === ModalID.DELETE_BOARD && (<DeleteBoardFormContainer />)}
            {modalId === ModalID.EDIT_BOARD && (<EditBoardFormContainer />)}
            {modalId === ModalID.ADD_NEW_TASK && (<AddNewTaskFormContainer />)}
            {modalId === ModalID.TASK_DETAIL && (<TaskDetailFormContainer />)}
            {modalId === ModalID.DELETE_TASK && (<DeleteTaskFormContainer />)}
            {modalId === ModalID.EDIT_TASK && (<EditTaskFormContainer />)}
        </Modal>
    );
};

export default ModalContainer;
