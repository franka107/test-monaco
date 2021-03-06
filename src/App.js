import "./App.css";
import Editor from "@monaco-editor/react";
//import schema from "./old-schema.json";

import schema from "./ic-function-schema.json";

function App() {
  const value = {
    schema: {
      asd: {
        "|$|fnKey": {},
      },
    },
    pipeline: [
      {
        action: "elementsAggregation",
        outputAlias: "elementsAggregationOutput",
        params: {
          modelKey: "banner",
          aggregationPipeline: [],
        },
      },
    ],
    "|$|pipeline": {
      fnKey: "arrayRootMap",
      "|$|params": {
        fnKey: "concatText",

        "|$|params": {
          fnKey: "mathOperation",
        },
      },
      params: {
        "|$|params": {},
      },
    },
  };

  return (
    <div className="App">
      <Editor
        height="100vh"
        defaultLanguage="json"
        theme="vs-dark"
        defaultValue={JSON.stringify(value, null, 2)}
        beforeMount={(monaco) => {
          //var modelUri = monaco.Uri.parse("a://b/foo.json"); // a made up unique URI for our model

          monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [
              {
                uri: "http://json-schema.org/draft-04/schema#", // id of the first schema
                //fileMatch: [modelUri.toString()], // associate with our model
                fileMatch: ["*"],
                schema: schema,
              },
            ],
          });
        }}
      />
    </div>
  );
}

export default App;
