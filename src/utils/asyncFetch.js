export async function fetchData(url) {
    try {
        // Actual fetch
        // const response = await fetch(url);

        // Mock fetch request and response object
        const response = {};
        if (url.includes("/fetch/seats/")) {
            response.ok = true;
            response.json = () => {
                return new Promise((resolve, reject) => {
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

        return {
            data: data,
            error: undefined
        };
    }
    catch (error) {
        return {
            data: undefined,
            error: error.message
        };
    }
  }