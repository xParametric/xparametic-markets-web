import React, { useState } from 'react';

import isEmpty from 'lodash/isEmpty';
import clx from 'classnames';

type Direction = 'row' | 'column';

type Item = {
  name: string;
  content: null;
};

interface Props {
  direction?: Direction;
  items: Item[];
}

const Tabs = ({ direction = 'row', items }: Props) => {
  const [activeTab, setActiveTab] = useState(items[0].name);

  function handleChangeTab(event: any) {
    setActiveTab(event.target.name);
  }

  return (
    <>
      <ul className={clx('tabs', direction)}>
        {!isEmpty(items) &&
          items.map(item => (
            <li
              key={item.name}
              className={clx('tabs__item', item.name === activeTab && 'active')}
            >
              <button
                type="button"
                name={item.name}
                onClick={event => handleChangeTab(event)}
              >
                {item.name}
              </button>
            </li>
          ))}
      </ul>
      {/* <>
        {!isEmpty(items) &&
          items.map(item => (
            <div
              className={clx(
                'tabs__content',
                item.name === activeTab && 'active'
              )}
              key={item.name}
            >
              {item.content}
            </div>
          ))}
      </> */}
    </>
  );
};

export default Tabs;