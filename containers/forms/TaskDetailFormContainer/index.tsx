import React, { useEffect, useMemo, useState } from 'react';
import TaskDetailForm from 'components/forms/TaskDetailForm';
import { useRouter } from 'next/router';
import { useAppStore } from 'lib/store';
import DropdownButton from 'components/commons/DropdownButton';
import { useForm } from 'react-hook-form';
import { IDetailTaskForm } from 'types/form';
import { ModalID } from 'types/modal';

const TaskDetailFormContainer: React.FC = () => {
    const router = useRouter();
    const { query: { id, taskId } } = router;
    const {
        boards, getTaskById, getColumnByTaskId, changeTaskStatus,
        updateTask, openModal,
    } = useAppStore();
    const currentBoard = useMemo(() => {
        return boards.find(({ id: _id }) => _id === Number(id));
    }, [boards, id]);
    const currentColumn = getColumnByTaskId(Number(taskId));
    const currentTask = getTaskById(Number(taskId));
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const status: Option[] = currentBoard ? currentBoard?.columns.map(({ id, name }) => {
        return {
            label: name,
            value: `${id}`,
        };
    }) : [];

    if (!currentColumn || !currentTask) {
        return (
            <></>
        );
    }

    const defaultValues = {
        subtasks: currentTask?.subtasks.map(({ isCompleted }) => {
            return {
                value: isCompleted,
            };
        }),
        status: status.find(({ label }) => label === currentColumn.name)?.value,
    };
    const { control, formState: { errors }, watch } = useForm({
        defaultValues,
    });

    const toggleOpenMenu = () => {
        setOpenMenu(!openMenu);
    };

    const onEditTask = () => {
        openModal(ModalID.EDIT_TASK);
        toggleOpenMenu();
    };

    const onDeleteTask = () => {
        openModal(ModalID.DELETE_TASK);
        toggleOpenMenu();
    };

    useEffect(() => {
        const { unsubscribe } = watch((value) => {
            const form = value as IDetailTaskForm;
            if (!form.status || !form.subtasks) {
                return;
            }

            const newTask: Task = {
                ...currentTask,
                status: form.status,
            };
            if (currentColumn.id !== Number(form.status)) {
                changeTaskStatus(
                    Number(id),
                    currentColumn.id,
                    Number(form.status),
                    newTask.id,
                );
                return ;
            }

            updateTask(Number(id), {
                ...newTask,
                subtasks: currentTask.subtasks.map((subtask, index) => {
                    const isCompleted: boolean | undefined = form.subtasks[index] ? form.subtasks[index].value : undefined;
                    return {
                        ...subtask,
                        isCompleted: isCompleted ? isCompleted : false,
                    };
                }),
            });
        });
        return () => unsubscribe();
    }, [id, currentColumn, watch]);

    return (
        <TaskDetailForm control={control}
                        errors={errors}
                        title={currentTask?.title || ''}
                        description={currentTask?.description}
                        subtasks={currentTask.subtasks}
                        status={status}
                        menu={(
                            <DropdownButton open={openMenu}
                                            toggleOpen={toggleOpenMenu}
                                            icon={'/icons/icon-vertical-ellipsis.svg'}
                                            height={'20px'}
                            >
                                <li onClick={onEditTask}>
                                    Edit Task
                                </li>
                                <li onClick={onDeleteTask}
                                    style={{
                                        color: 'var(--theme-danger-color)'
                                    }}
                                >
                                    Delete Task
                                </li>
                            </DropdownButton>
                        )}
        />
    );
};

export default TaskDetailFormContainer;
