import React, { HTMLAttributes, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import TaskForm from 'components/boards/TaskForm';
import { useAppStore } from 'lib/store';
import { useRouter } from 'next/router';
import { IAddTaskForm } from 'types/form';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const AddNewTaskFormContainer: React.FC<IProps> = (props) => {
    const router = useRouter();
    const { query: { id } } = router;
    const { boards, addTask, closeModal } = useAppStore();
    const currentBoard = useMemo(() => {
        return boards.find(({ id: _id }) => _id === Number(id));
    }, [id, boards]);
    const status: Option[] = currentBoard ? currentBoard?.columns.map(({ id, name }) => {
        return {
            label: name,
            value: `${id}`,
        };
    }) : [];
    const defaultValues = {
        title: '',
        description: '',
        subtasks: [
            {
                value: '',
            },
            {
                value: '',
            },
        ],
        status: status[0].value,
    };
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
    });

    const onSubmit = (data: IAddTaskForm) => {
        const { title, description, subtasks, status } = data;
        const newSubtasks: Subtask[] = subtasks.map(({ value }, index) => {
            return {
                id: index + 1,
                title: value,
                isCompleted: false,
            };
        });
        const newTask: Task = {
            id: -1,
            title,
            description,
            status,
            subtasks: newSubtasks,
        };
        addTask(Number(id), newTask);
        closeModal();
    };

    return (
        <div {...props}>
            <TaskForm title={'Add New Task'}
                      buttonName={'Create Task'}
                      control={control}
                      errors={errors}
                      onSubmit={handleSubmit(onSubmit)}
                      status={status}
            />
        </div>
    );
};

export default AddNewTaskFormContainer;
