import { setConfig } from "@faustwp/core";
import templates from "./wp-templates";
import possibleTypes from "./possibleTypes.json";
import { RelayStylePaginationPlugin } from "./plugins/RelayStylePaginationPlugin";

const queryConfig =
  process.env.CACHE_API_RESPONSES === "true"
    ? {
        usePersistedQueries: true,
      }
    : {
        useGETForQueries: false,
      };

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  experimentalPlugins: [new RelayStylePaginationPlugin()],
  experimentalToolbar: true,
  possibleTypes,
  ...queryConfig,
});
