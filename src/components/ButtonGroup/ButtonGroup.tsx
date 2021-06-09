/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';

type ButtonColor = 'default' | 'primary' | 'success' | 'danger';

type Button = {
  /**
   * Unique id of this button
   */
  id: string;
  /**
   * Name of this button
   */
  name: string;
  /**
   * Color of the component
   * @default 'default'
   */
  color: ButtonColor;
};

type ButtonGroupProps = {
  /**
   * Id of the default active button
   */
  defaultActiveId: string;
  /**
   * Array of buttons to be displayed
   */
  buttons: Button[];
  /**
   * The callback function triggered when click on button
   */
  onChange: (id: string) => void;
  /**
   * Aditional styles
   */
  style?: React.CSSProperties;
};

function ButtonGroup({
  defaultActiveId,
  buttons,
  onChange,
  style
}: ButtonGroupProps) {
  const initialState =
    buttons.find(button => button.id === defaultActiveId) || buttons[0];

  const [activeButton, setActiveButton] = useState(initialState);

  if (isUndefined(defaultActiveId) || isEmpty(buttons)) return null;

  function handleChangeActiveButton(button: Button) {
    setActiveButton(button);
    onChange(button.id);
  }

  return (
    <div className={`pm-c-button-group--${activeButton.color}`} style={style}>
      {buttons?.map(button => (
        <button
          type="button"
          key={button.id}
          id={button.id}
          name={button.name}
          className={classNames({
            'pm-c-button-group__item': true,
            active: button.id === activeButton.id
          })}
          onClick={() => handleChangeActiveButton(button)}
        >
          {button.name}
        </button>
      ))}
    </div>
  );
}

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
