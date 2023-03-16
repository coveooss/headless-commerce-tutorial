import {
    ResultTemplatesManager,
    Result,
    buildResultTemplatesManager,
    buildInteractiveResult
  } from '@coveo/headless';
import {headlessEngine} from '../Engine';

const sendAddToCartEvent = (result: Result) => {
  coveoua('ec:addProduct', {
    'id': result.uniqueId,
    'name': result.title,
  });
  coveoua('ec:setAction', 'add', {
    list: headlessEngine.state.search.response.searchUid
  });
  coveoua('send','event')
}

const interactiveResult = (result: Result) => {
    const interactiveResultController = buildInteractiveResult(headlessEngine, {
        options: { result: result},
      });
      return (
        <a
          href='#'
          onClick={() => interactiveResultController.select()}
        >
          {result.title}
        </a>
      );
}

export const resultTemplatesManager: ResultTemplatesManager<
    (result: Result) => JSX.Element> = buildResultTemplatesManager(headlessEngine);

    resultTemplatesManager.registerTemplates({
        conditions: [],
        content: (result: Result) => (
            <li key={result.uniqueId}>
            <div>
                <div className='result-item-header'>
                    {interactiveResult(result)}
                    <button 
                      className='result-button'
                      onClick={() => sendAddToCartEvent(result)}
                    >
                      Add to cart
                    </button>
                </div>
                <p>{result.excerpt}</p>
            </div>
            </li>
        ),
});