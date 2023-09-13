const pipedrive = require("pipedrive"); // or however you import pipedrive

const defaultClient = new pipedrive.ApiClient();

// Configure authorization by setting API key
// PIPEDRIVE_API_KEY is an environment variable that holds the real API key
defaultClient.authentications.api_key.apiKey = process.env.PIPEDRIVE_KEY;

async function getDeals() {
  try {
    console.log("Sending request...");

    const api = new pipedrive.DealsApi(defaultClient);
    const response = await api.getDeals();

    console.log("Got deals successfully!", response);

    if (response && response.data) {
      return {
        ok: true,
        name: "pipedrive",
        deals: response.data,
        length: response.data.length, // assuming data contains the array of deals
      };
    } else {
      return {
        ok: false,
        name: "pipedrive",
        length: 0,
      };
    }
  } catch (err) {
    const errorToLog = err.context?.body || err;
    console.error("Getting deals failed", errorToLog);

    return {
      ok: false,
      name: "pipedrive",
      length: 0,
    };
  }
}

// Uncomment the following line if you want to run getDeals when the script is executed
getDeals();
