import React from 'react';
import {BiErrorCircle} from 'react-icons/bi';

function Message({content, className}) {
  return (
    <h3 className={`${className} message`}>{content}</h3>
  )
}

export default Message