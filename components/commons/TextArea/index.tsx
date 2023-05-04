import React, { TextareaHTMLAttributes } from 'react';
import styles from 'components/commons/TextArea/style.module.scss';
import cn from 'classnames';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

const TextArea: React.FC<IProps> = ({ error, className, children, ...props }) => {
    return (
        <div className={cn(styles.textareaWrapper, {
            [styles.error]: error,
        }, className)}>
            <textarea className={styles.textarea}
                      {...props}
            >
                {children}
            </textarea>

            {error && (
                <div className={styles.errorMessage}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default TextArea;
