import React from 'react';

const MidContentDisplay = ({ MidData, activeComponent }) => {
  return (
    <>
      {MidData.filter(
        (component) => MidData.indexOf(component) === activeComponent
      ).map((component, i) => {
        return <div key={i}>{component}</div>;
      })}
    </>
  );
};

export default MidContentDisplay;
