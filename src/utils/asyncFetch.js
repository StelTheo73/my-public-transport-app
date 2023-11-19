export async function fetchData(url) {
    try {
        // Actual fetch
        // const response = await fetch(url);

        // Mock fetch request and response object
        const response = {};
        if (url.incudes("/fetch/seats/")) {
            response.ok = true;
            response.json = () => {
                return new Promise((resolve, reject) => {
                    console.log("FetchSeats");
                    resolve([]);
                })
            }
        }
        else {
            console.log("URL did not match!");
            throw new Error("URL did not match!");
        }


        if (!response.ok) {
            throw new Error("Request failed with status " + response.status);
        }

        const data = await response.json();

        return (data, undefined);
    }
    catch (error) {
      return (undefined, error.message)
    }
  }