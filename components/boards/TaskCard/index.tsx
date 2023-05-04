import React, { HTMLAttributes } from 'react';
import styles from 'components/boards/TaskCard/style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    task: Task;
}

const TaskCard: React.FC<IProps> = ({ task: { title, subtasks }, className, ...props }) => {
    const completedSubtasks = subtasks.filter(({ isCompleted }) => isCompleted);

    return (
        <div className={cn(styles.taskCard, className)}
             {...props}
        >
            <div className={styles.title}>
                {title}
            </div>
            <p className={styles.description}>
                {completedSubtasks.length} of {subtasks.length} subtasks
            </p>
        </div>
    );
};

export default TaskCard;
