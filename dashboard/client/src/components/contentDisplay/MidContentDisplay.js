import React from 'react';

const MidContentDisplay = ({ MidData, activeComponent }) => {
  return (
    <>
      {MidData.map((component, index) => {
        if (index === activeComponent)
          return <div key={index}>{component}</div>;
      })}
    </>
  );
};

export default MidContentDisplay;
