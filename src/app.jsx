require("bootstrap/dist/css/bootstrap.css");
require("bootstrap/dist/css/bootstrap-theme.css");
require("./app.scss");

import React from 'react';
import HarViewer from './components/HarViewer.jsx';

require('./samples');

React.render(
    < HarViewer />,   
    document.body
);