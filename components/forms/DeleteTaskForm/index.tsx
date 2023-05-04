import React, { FormEventHandler, HTMLAttributes } from 'react';
import Form from 'components/commons/Form';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    taskName: string;
    onSubmit: FormEventHandler<any>;
    onCancel: () => void;
}

const TaskBoardForm: React.FC<IProps> = ({ taskName, className, onSubmit, onCancel }) => {
    return (
        <Form className={className}
              variant={'danger'}
              title={'Delete this task?'}
              description={`Are you sure you want to delete the ‘${taskName}’ task and its subtasks? This action cannot be reversed.`}
              buttonName={'Delete'}
              onSubmit={onSubmit}
              onCancel={onCancel}
        />
    );
};

export default TaskBoardForm;
