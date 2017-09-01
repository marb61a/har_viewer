var _ = require("lodash");

import Page from './Page.js';
import Entry from './Entry.js';

export default {
    parse: parse
};

function parse(har){
    "use strict";
    
    var pagemap = {},
        pages = [];
    
    
}