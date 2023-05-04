import React, { HTMLAttributes } from 'react';
import DeleteBoardForm from 'components/forms/DeleteBoardForm';
import { useAppStore } from 'lib/store';
import { useRouter } from 'next/router';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const DeleteBoardFormContainer: React.FC<IProps> = ({ className }) => {
    const { boards, deleteBoard, closeModal } = useAppStore();
    const router = useRouter();
    const { pathname, query: { id } } = router;

    const onSubmit = (data: object) => {
        const returnId = deleteBoard(Number(id));
        closeModal();
        router.push({
            pathname,
            query: {
                id: returnId,
            },
        });
    };

    const onCancel = () => {
        closeModal();
    };

    return (
        <DeleteBoardForm className={className}
                         boardName={boards.find(({ id: _id }) => _id === Number(id))?.name || ''}
                         onSubmit={onSubmit}
                         onCancel={onCancel}
        />
    );
};

export default DeleteBoardFormContainer;
