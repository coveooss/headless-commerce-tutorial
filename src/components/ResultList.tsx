import { useState, useEffect } from 'react';
import {ResultList as ResultListController, ResultTemplatesManager, Result} from '@coveo/headless'


interface ResultListProps {
    controller: ResultListController,
    resultTemplatesManager: ResultTemplatesManager<(result: Result) => JSX.Element>;
}

const ResultList: React.FC<ResultListProps> = (props) => {
  const {controller, resultTemplatesManager} = props;
    const [state, setState] = useState(controller.state);
  
    useEffect(
      () => controller.subscribe(() => setState(controller.state)),
      [controller]
    );
    if (!state.results.length) {
        return <div>No results</div>;
      }

      return (
        <div className="result-list">
          <ul>
            {state.results.map((result) => {
              const template = resultTemplatesManager.selectTemplate(result);

              if (!template)
                throw new Error(`No result template provided for ${result.title}.`);

              return template(result);
            })}
          </ul>
        </div>
      );
    };

export default ResultList