import logo from "./logo.svg";
import "./App.css";
import Editor from "@monaco-editor/react";

function App() {
  const value = {
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
  };
  return (
    <div className="App">
      <Editor
        height="90vh"
        defaultLanguage="json"
        defaultValue={JSON.stringify(value, null, 2)}
        beforeMount={(monaco) => {
          //var modelUri = monaco.Uri.parse("a://b/foo.json"); // a made up unique URI for our model

          monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [
              {
                uri: "http://myserver/foo-schema.json", // id of the first schema
                //fileMatch: [modelUri.toString()], // associate with our model
                schema: {
                  type: "object",
                  properties: {
                    p1: {
                      enum: ["v1", "v2"],
                    },
                    p2: {
                      $ref: "http://myserver/bar-schema.json", // reference the second schema
                    },
                  },
                },
              },
            ],
          });
        }}
      />
    </div>
  );
}

export default App;
