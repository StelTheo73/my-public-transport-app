import { useEffect, useRef, useState } from 'react';

import tripObject from '../database/trips.json';
import stationsObject from '../database/stations.json';

export const useFetch = (url, headers={}, _body={}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // Use an object as Reference,
    // otherwise the page will keep reloading for ever
    const body = useRef(_body);

    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async () => {
            setLoading(true);
            console.log("FETCHING DATA")
            try {

                // This should be the actual fetch request
                // const response = await fetch(url,
                //     {
                //         signal: controller.signal
                //     }
                // );

                // Mock fetch request and response object
                const response = new Object();
                if (url.includes("/fetch/stations")) {
                    console.log("FetchStations");
                    response.ok = true;
                    response.json = () => {
                        return new Promise((resolve, reject) => {
                            resolve(stationsObject);
                        })
                    }
                }
                else if (url.includes("/fetch/trips/AthensPatras")) {
                    console.log("FetchAthensPatras");
                    response.ok = true;
                    response.json = () => {
                        return new Promise((resolve, reject) => {
                            resolve(tripObject.AthensPatras);
                        })
                    }
                }
                else if (url.includes("/fetch/trips/PatrasAthens")) {
                    console.log("FetchPatrasAthens");
                    response.ok = true;
                    response.json = () => {
                        return new Promise((resolve, reject) => {
                            resolve(tripObject.PatrasAthens);
                        })
                    }
                }
                else {
                    console.log("URL did not match!");
                    throw new Error("URL did not match!");
                }

                if (!response.ok) {
                    throw new Error("Fetch failed");
                }

                const data = await response.json();
                setLoading(false);
                setError("");
                setData(data);

                // console.log(data)

            }
            catch (error) {
                setLoading(false);
                setError(error.message);
            }

        console.log("FETCH FINISHED")

        }
        fetchData();
        console.log("FETCH FINISHED2")

        // return () => controller.abort();
    }, [url, body]);

    return { data, loading, error };

}