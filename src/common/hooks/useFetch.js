// from https://github.com/valentinogagliardi updating
// my implementation of https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/
import { useEffect, useRef, useReducer } from 'react';

export const useFetch = (endpoint) => {
	const cache = useRef({});

	const initialState = {
		status: 'idle',
		error: null,
		data: [],
	};

	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'FETCHING':
				return { ...initialState, status: 'fetching' };
			case 'FETCHED':
				return { ...initialState, status: 'fetched', data: action.payload };
			case 'FETCH_ERROR':
				return { ...initialState, status: 'error', error: action.payload };
			default:
				return state;
		}
	}, initialState);

	useEffect(() => {
		let cancelRequest = false;
		if (!endpoint) return;

		const fetchData = async () => {
			if (cache.current[endpoint]) {
				const data = cache.current[endpoint];
				dispatch({ type: 'FETCHED', payload: data });
			} 
      else {
        fetch(endpoint)
        .then(response => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then(json => {
          cache.current[endpoint] = json;
          if (cancelRequest) return;
          dispatch({ type: "FETCHED", payload: json });
        })
        .catch(error => {
          if (cancelRequest) return;
          dispatch({ type: "FETCH_ERROR", payload: error.message });
        })
        .finally(() => {
          if (cancelRequest) return;
          dispatch({ type: "FETCH_FINISH" });
        });
      }
		};

		fetchData();

    // Before we attempt to make state changes, we first confirm if the component has been unmounted. If it has been unmounted, we skip updating the state and if it hasn’t been unmounted, we update the state. This will resolve the React state update error, and also prevent race conditions in our components.
		return function cleanup() {
			cancelRequest = true;
		};

	}, [endpoint]);

	return state;
};

export default useFetch;
