import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

export function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="container">
        hello je suis la
      </div>
      <button className='floating-btn'>
        <FaPlus />
      </button>
    </>
  )
}
