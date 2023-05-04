import React, { HTMLAttributes } from 'react';
import { useAppStore } from 'lib/store';
import { useRouter } from 'next/router';
import DeleteTaskForm from 'components/forms/DeleteTaskForm';
import { useForm } from 'react-hook-form';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const DeleteTaskFormContainer: React.FC<IProps> = ({ className }) => {
    const { deleteTask, closeModal, getTaskById } = useAppStore();
    const router = useRouter();
    const { pathname, query: { id, taskId } } = router;
    const currentTask = getTaskById(Number(taskId));
    const { handleSubmit } = useForm();

    const onSubmit = (data: object) => {
        deleteTask(Number(id), Number(taskId));
        closeModal();
        router.push({
            pathname,
            query: {
                id,
            },
        });
    };

    if (!currentTask) {
        return <></>;
    }

    const onCancel = () => {
        closeModal();
    };

    return (
        <DeleteTaskForm className={className}
                        taskName={currentTask.title}
                        onSubmit={handleSubmit(onSubmit)}
                        onCancel={onCancel}
        />
    );
};

export default DeleteTaskFormContainer;
