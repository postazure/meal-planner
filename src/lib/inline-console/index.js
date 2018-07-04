import React from 'react';
import ReactDOM from 'react-dom';
import InlineConsole from './inline-console.js'

const target = document.createElement('div')
document.body.appendChild(target)

ReactDOM.render(<InlineConsole />, target);
