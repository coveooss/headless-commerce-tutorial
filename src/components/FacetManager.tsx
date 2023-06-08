import {
  FacetManager as FacetManagerController,
  Facet as FacetController,
  FacetManagerPayload,
} from "@coveo/headless";
import { useEffect, useState, ReactElement, Children } from "react";

type FacetManagerChild = ReactElement<{ controller: FacetController }>;

interface FacetManagerProps {
  controller: FacetManagerController;
  children: FacetManagerChild | FacetManagerChild[];
}

export const FacetManager: React.FC<FacetManagerProps> = (props) => {
  const { controller } = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState(controller.state)), []);

  function createPayload(
    facets: FacetManagerChild[]
  ): FacetManagerPayload<FacetManagerChild>[] {
    return facets.map((facet) => ({
      facetId: facet.props.controller.state.facetId,
      payload: facet,
    }));
  }

  const childFacets = Children.toArray(props.children) as FacetManagerChild[];
  const payload = createPayload(childFacets);
  const sortedFacets = controller.sort(payload).map((p) => p.payload);

  return <div>{sortedFacets}</div>;
};
