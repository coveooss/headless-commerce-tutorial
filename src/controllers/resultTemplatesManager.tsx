import {
    ResultTemplatesManager,
    Result,
    buildResultTemplatesManager,
  } from '@coveo/headless';
import {headlessEngine} from '../Engine';

export const resultTemplatesManager: ResultTemplatesManager<
    (result: Result) => JSX.Element> = buildResultTemplatesManager(headlessEngine);

    resultTemplatesManager.registerTemplates({
        conditions: [],
        content: (result: Result) => (
            <li key={result.uniqueId}>
            <div>
                <div className='result-item-header'>
                    <h2>{result.title}</h2>
                    <button className='result-button'>Add to cart</button>
                </div>
                <p>{result.excerpt}</p>
            </div>
            </li>
        ),
});