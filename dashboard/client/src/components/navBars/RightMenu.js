import React from 'react';

const RightMenu = ({ MenuData, setActiveComponent, activeComponent }) => {
  return (
    <>
      {MenuData.map((item, i) => {
        return (
          <a
            className={`item ${
              activeComponent === MenuData.indexOf(item) ? 'active' : ''
            }`}
            onClick={() => setActiveComponent(MenuData.indexOf(item))}
            key={i}
          >
            {item}
          </a>
        );
      })}
    </>
  );
};

export default RightMenu;
