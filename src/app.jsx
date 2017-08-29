require("bootstrap/dist/css/bootstrap.css");
require("bootstrap/dist/css/bootstrap-theme.css");
require("./app.scss");

import React from 'react';
import HarViewer from './components/HarViewer.jsx';

<script type="text/babel">
    React.render(
        < HarViewer />,   
        document.body
    );
</script>;