import Seats from "../database/seats.json";

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
                    const vehicleType =
                        url.split("/fetch/seats/")[1].split("/")[1][0];
                    const seats = Seats[vehicleType];
                    seats === undefined ? resolve({}) : resolve(seats);
                });
            };
        }
        else {
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
