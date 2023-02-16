type FetchMethods = "GET" | "POST";

interface UseRequestArgs {
	url: string;
	method?: FetchMethods;
	date: Date;
}

const useRequest = () => {
	// send request for getting the launches
	let _header = {
		"Content-Type": "application/json",
	};

	const request = async ({ url, method = "POST", date }: UseRequestArgs) => {
		const body = {
			query: {
				date_utc: date,
			},
		};

		const res = await fetch(url, {
			method,
			headers: _header,
			body: JSON.stringify(body),
		});

		return res.json();
	};

	return request;
};

export default useRequest;
