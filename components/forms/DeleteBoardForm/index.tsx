import React, { FormEventHandler, HTMLAttributes } from 'react';
import Form from 'components/commons/Form';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    boardName: string;
    onSubmit: FormEventHandler<any>;
    onCancel: () => void;
}

const DeleteBoardForm: React.FC<IProps> = ({ boardName, className, onSubmit, onCancel }) => {
    return (
        <Form className={className}
              variant={'danger'}
              title={'Delete this board?'}
              description={`Are you sure you want to delete the ‘${boardName}’ board? This action will remove all columns and tasks and cannot be reversed.`}
              buttonName={'Delete'}
              onSubmit={onSubmit}
              onCancel={onCancel}
        />
    );
};

export default DeleteBoardForm;
