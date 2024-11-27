import React, { useState, forwardRef } from 'react';

const ToggleSwitch = forwardRef(function({
  isActive
}, ref) {
    const [isOn, setIsOn] = useState(false);

  const toggleSwitch = (e) => {
    e.preventDefault();
    setIsOn(!isOn);
    isActive(isOn);
  };

  return (
    <div className="flex">
      <button 
        onClick={(e) => toggleSwitch(e)}
        className={`
          w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out
          ${isOn 
            ? 'bg-green-500 justify-end' 
            : 'bg-gray-300 justify-start'}
          flex items-center
        `}
        ref={ref}
      >
        <div 
          className={`
            w-4 h-4 mr-4 bg-white rounded-full shadow-md transform transition-transform duration-300
            ${isOn ? 'translate-x-full' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
})

export default ToggleSwitch;