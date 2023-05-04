import React, { FormEventHandler, FormHTMLAttributes } from "react";
import styles from "components/forms/BoardForm/style.module.scss";
import Form from "components/commons/Form";
import Input from "components/commons/Input";
import Label from "components/commons/Label";
import { Controller, useFieldArray } from "react-hook-form";
import { Control } from "react-hook-form/dist/types/form";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import Button from "components/commons/Button";
import cn from "classnames";
import { IForm } from "types/form";
import ColorSelect from "components/commons/ColorSelect";
import { randomHexColor } from "lib/utils";

interface IProps
    extends Omit<FormHTMLAttributes<HTMLFormElement>, "title">,
        IForm {
    control: Control<any>;
    errors: FieldErrors<any>;
    onSubmit?: FormEventHandler<any> | undefined;
}

const BoardForm: React.FC<IProps> = ({
    control,
    errors,
    onSubmit,
    className,
    ...props
}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "columns",
    });

    return (
        <Form
            className={cn(styles.boardForm, className)}
            onSubmit={onSubmit}
            {...props}
        >
            <div>
                <Label htmlFor={"name"}>Board Name</Label>
                <Controller
                    control={control}
                    name={"name"}
                    rules={{
                        required: "Can’t be empty",
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <Input
                            id={"name"}
                            placeholder={"e.g. Web Design"}
                            error={error?.message}
                            {...field}
                        />
                    )}
                />
            </div>
            <div className={styles.boardColumnsContainer}>
                <Label>Board Columns</Label>
                <ul className={styles.columnList}>
                    {fields.map((item, index) => (
                        <li className={styles.columnItem} key={item.id}>
                            <Controller
                                control={control}
                                name={`columns.${index}.id`}
                                render={({ field: { value } }) => (
                                    <Input
                                        className={cn(
                                            styles.input,
                                            styles.hidden
                                        )}
                                        value={value}
                                        hidden
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name={`columns.${index}.color`}
                                rules={{
                                    required: "Can’t be empty",
                                }}
                                render={({ field }) => (
                                    <ColorSelect {...field} />
                                )}
                            />
                            <Controller
                                control={control}
                                name={`columns.${index}.value`}
                                rules={{
                                    required: "Can’t be empty",
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <Input
                                        className={styles.input}
                                        error={error?.message}
                                        {...field}
                                    />
                                )}
                            />
                            <button
                                className={styles.removeButton}
                                type={"button"}
                                onClick={() => remove(index)}
                            >
                                <img
                                    src={"/icons/icon-cross.svg"}
                                    alt={"remove"}
                                />
                            </button>
                        </li>
                    ))}
                </ul>
                <Button
                    type={"button"}
                    variant={"secondary"}
                    onClick={(_) =>
                        append({ color: randomHexColor(), value: "" })
                    }
                >
                    + Add New Column
                </Button>
            </div>
        </Form>
    );
};

export default BoardForm;
