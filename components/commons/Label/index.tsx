import React, { LabelHTMLAttributes } from 'react';
import styles from 'components/commons/Label/style.module.scss';
import cn from 'classnames';

interface IProps extends LabelHTMLAttributes<HTMLLabelElement> {

}

const Label: React.FC<IProps> = ({ className, children, ...props}) => {
    return (
        <label className={cn(styles.label, className)}
               {...props}
        >
            {children}
        </label>
    );
};

export default Label;
