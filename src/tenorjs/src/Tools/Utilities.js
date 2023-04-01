exports.callAPI = function (Path, Callback) {
    fetch(Path)
        .then(response => {
            const Code = response.status,
                Type = response.headers.get("content-type");

            if (Code !== 200) {
                const error = `# [TenorJS] Could not send request @ ${Path} - Status Code: ${Code}`;
                error.code = "ERR_REQ_SEND";
                throw error;
            }

            if (!Type.includes("application/json")) {
                const error = `# [TenorJS] Content received isn't JSON. Type: ${Type}`;
                error.code = "ERR_RES_NOT";
                throw error;
            }

            return response.json();
        })
        .then(jsonData => {
            let Data, Error = null, dForm;

            try {
                /**
                 * Path checks.
                 */
                if (Path.includes("categories")) {
                    dForm = jsonData.tags;
                } else {
                    dForm = jsonData.results;
                }

                Data = dForm;

                for (let data of Object.values(Data)) {
                    if (!data.title) data.title = "Untitled";

                    if (!Path.includes("categories")) {
                        data.created_stamp = data.created;
                        // data.created = Moment.unix(data.created).format(require(configFile)["DateFormat"]);
                    }
                }
            } catch (e) {
                Error = "# [TenorJS] Failed to parse retrieved JSON.";
                Error.code = 'ERR_JSON_PARSE';
            }

            Callback(Error, Data);
        })
        .catch(error => {
            Callback(error);
        });
};
// exports.manageAPI = function (Endpoint, Callback, pResolve, pReject)
// {
//       this.callAPI(Endpoint, (Error, Result) => {
//             if (Error)
//             {
//                   if (typeof Callback === "function") Callback(Error);

//                   pReject(Error);

//                   return;
//             }

//             if (typeof Callback === "function") Callback(null, Result[0]);
//             return Result;
//       });
// };

exports.manageAPI = function (Endpoint, Callback, pResolve, pReject)
{
      this.callAPI(Endpoint, (Error, Result) => {
            if (Error)
            {
                  if (typeof Callback === "function") Callback(Error);

                  pReject(Error);

                  return;
            }

            if (typeof Callback === "function") Callback(null, Result[0]);
            pResolve(Result);
      });
};

// exports.manageAPI = (Endpoint, Callback) => {
//     return new Promise((resolve, reject) => {
//       this.callAPI(Endpoint, (Error, Result) => {
//         if (Error) {
//           if (typeof Callback === "function") Callback(Error);
//           reject(Error);
//           return;
//         }
//         if (typeof Callback === "function") Callback(null, Result[0]);
//         resolve(Result);
//       });
//     });
//   };

// export const manageAPI = async (Endpoint) => {
//     return new Promise((resolve, reject) => {
//       callAPI(Endpoint, (Error, Result) => {
//         if (Error) {
//           reject(Error);
//           return;
//         }
  
//         const data = Result[0];
//         if (!data) {
//           reject('No data found');
//           return;
//         }
  
//         if (typeof data.title === 'undefined') {
//           data.title = 'Untitled';
//         }
  
//         if (!Endpoint.includes('categories')) {
//           data.created_stamp = data.created;
//         }
  
//         resolve(data);
//       });
//     });
//   };
  