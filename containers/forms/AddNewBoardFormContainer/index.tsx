import React, { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { useAppStore } from 'lib/store';
import { useRouter } from 'next/router';
import BoardForm from 'components/forms/BoardForm';
import { IAddBoardForm } from 'types/form';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const AddNewBoardFormContainer: React.FC = (props) => {
    const defaultValues = {
        name: '',
        columns: [
            {
                color: '#49C4E5',
                value: 'Todo',
            },
            {
                color: '#8471F2',
                value: 'Doing',
            },
        ],
    };
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
    });
    const { addBoard, closeModal } = useAppStore();
    const router = useRouter();
    const { pathname } = router;

    const onSubmit = (data: IAddBoardForm) => {
        const { name }: { name: string } = data;
        const columns: Column[] = data.columns.map(({ color, value }, index) => {
            return {
                id: index,
                name: value,
                color,
                tasks: [],
            };
        });
        const newId = addBoard({
            id: -1,
            name,
            columns,
        });
        closeModal();
        router.push({
            pathname,
            query: {
                id: newId,
            },
        });
    };

    return (
        <div {...props}>
            <BoardForm title={'Add New Board'}
                       buttonName={'Create New Board'}
                       control={control}
                       errors={errors}
                       onSubmit={handleSubmit(onSubmit)}
            />
        </div>
    );
};

export default AddNewBoardFormContainer;
