import React from 'react'
import { useState, useEffect } from 'react';
import {SearchBox as SearchBoxController} from '@coveo/headless'


interface SearchBoxProps {
    controller: SearchBoxController
}

const SearchBox: React.FC<SearchBoxProps> = (props) => {
    const {controller} = props
    const [state, setState] = useState(controller.state);

    useEffect(
      () => controller.subscribe(() => setState(controller.state)),
      [controller]
    );
    return (
      <div className='search-box'>
          <input
              placeholder='Search in Barca...'
              value={state.value}
              onChange={(e) => controller.updateText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && controller.submit()}
              />
      </div>
    );
  };

export default SearchBox
