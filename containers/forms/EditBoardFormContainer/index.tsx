import React, { FormHTMLAttributes, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useAppStore } from 'lib/store';
import { useRouter } from 'next/router';
import BoardForm from 'components/forms/BoardForm';
import { IEditBoardForm } from 'types/form';

interface IProps extends FormHTMLAttributes<HTMLFormElement> {

}

const EditBoardFormContainer: React.FC = (props) => {
    const router = useRouter();
    const { query: { id } } = router;
    const { boards, editBoard, closeModal } = useAppStore();
    const currentBoard: Board | undefined = useMemo(() => {
        return boards.find(({ id: _id }) => _id === Number(id));
    }, [id, boards]);

    if (!currentBoard) {
        return <></>;
    }

    const defaultValues = {
        name: currentBoard.name,
        columns: currentBoard.columns.map(({ id, color, name: value }) => {
            return {
                id,
                color,
                value,
            };
        }),
    };
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
    });

    const onSubmit = (data: IEditBoardForm) => {
        const { name }: { name: string } = data;
        const columns: Column[] = data.columns.map(({ id, color, value }) => {
            const column: Column | undefined = currentBoard.columns.find(({ id: _id }) => _id === id);

            if (!id || !column) {
                return {
                    id: -1,
                    name: value,
                    color,
                    tasks: [],
                }
            }
            return {
                ...column,
                name: value,
                color,
            };
        });
        editBoard({
            id: Number(id),
            name,
            columns,
        });
        closeModal();
    };

    return (
        <div {...props}>
            <BoardForm title={'Edit Board'}
                       buttonName={'Save Changes'}
                       control={control}
                       errors={errors}
                       onSubmit={handleSubmit(onSubmit)}
            />
        </div>
    );
};

export default EditBoardFormContainer;
