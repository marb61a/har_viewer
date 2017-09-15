require("bootstrap/dist/css/bootstrap.css");
require("bootstrap/dist/css/bootstrap-theme.css");
require("./app.scss");

import React from 'react';
import ReactDom from 'react-dom';
import HarViewer from './components/HarViewer.jsx';

require('./samples');

ReactDom.render(
    < HarViewer />,   
    document.body
);