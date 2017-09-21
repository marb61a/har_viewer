require("bootstrap/dist/css/bootstrap.css");
require("bootstrap/dist/css/bootstrap-theme.css");
require('./samples');

import React from 'react';
import ReactDom from 'react-dom';
import HarViewer from './components/HarViewer.jsx';

ReactDom.render(
    < HarViewer />,   
    document.body
);