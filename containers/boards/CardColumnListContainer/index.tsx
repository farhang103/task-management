import React, { HTMLAttributes, useMemo } from 'react';
import EmptyBoard from 'components/boards/EmptyBoard';
import { useAppStore } from 'lib/store';
import { useRouter } from 'next/router';
import ColumnBoard from 'components/boards/ColumnBoard';
import CardColumn from 'components/boards/CardColumn';
import TaskCard from 'components/boards/TaskCard';
import Link from 'next/link';
import NewColumnBox from 'components/boards/NewColumnBox';
import { ModalID } from 'types/modal';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const CardColumnListContainer: React.FC<IProps> = (props) => {
    const router = useRouter();
    const { query: { id } } = router;
    const { boards, moveTask, openModal } = useAppStore();
    const currentBoard = useMemo(() => {
        const board = boards.find(({ id: _id }) => _id === Number(id));
        if (!board) {
            return {
                name: '',
                columns: [],
            };
        }
        return board;
    }, [id, boards]);

    const onDragEnd = (result: DropResult) => {
        const boardId = Number(id);
        const { source, destination } = result;
        if (!destination?.droppableId) {
            return;
        }
        const sourceColumnId = Number(source.droppableId);
        const sourceIndex = source.index;
        const destinationColumnId = Number(destination.droppableId);
        const destinationIndex = destination.index;

        moveTask(boardId, sourceColumnId, sourceIndex, destinationColumnId, destinationIndex);
    };

    const onAddNewColumn = () => {
        openModal(ModalID.EDIT_BOARD);
    };

    return (
        <div {...props}>
            {currentBoard.columns.length === 0 ? (
                <EmptyBoard onAddNewColumn={onAddNewColumn} />
            ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                    <ColumnBoard>
                        {currentBoard.columns.map((column) => (
                            <li key={column.id}>
                                <Droppable droppableId={`${column.id}`}>
                                    {(provided, snapshot) => (
                                        <div {...provided.droppableProps}
                                             ref={provided.innerRef}
                                        >
                                            <CardColumn column={column}>
                                                {column.tasks.map((task, index) => (
                                                    <>
                                                        {task && (
                                                            <Draggable draggableId={`${task.id}`}
                                                                       index={index}
                                                                       key={task?.id}
                                                            >
                                                                {(provided, snapshot) => (
                                                                    <li {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        ref={provided.innerRef}
                                                                        style={{
                                                                            ...provided.draggableProps.style,
                                                                        }}
                                                                    >
                                                                        <Link href={`/?id=${id}&taskId=${task?.id}`}>
                                                                            <a>
                                                                                <TaskCard task={task} />
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                )}
                                                            </Draggable>
                                                        )}
                                                    </>
                                                ))}
                                            </CardColumn>
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </li>
                        ))}
                        <li>
                            <NewColumnBox onClick={onAddNewColumn} />
                        </li>
                    </ColumnBoard>
                </DragDropContext>
            )}
        </div>
    );
};

export default CardColumnListContainer;
