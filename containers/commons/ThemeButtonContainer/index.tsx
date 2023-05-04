import React, { useContext } from 'react';
import { ActionType, ThemeContext } from 'lib/ThemeContext';
import ThemeButton from 'components/buttons/ThemeButton';
import { Theme } from 'types/theme';

const ThemeButtonContainer: React.FC = () => {
    const { theme, dispatch } = useContext(ThemeContext);

    const onToggle = () => {
        dispatch(ActionType.TOGGLE_THEME, {});
    };

    return (
        <ThemeButton on={theme === Theme.DARK}
                     onClick={onToggle}
        />
    );
};

export default ThemeButtonContainer;
