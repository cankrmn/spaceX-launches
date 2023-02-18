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
		const dayStart = new Date(date);
		dayStart.setUTCHours(0, 0, 0, 0);

		const dayEnd = new Date(date);
		dayEnd.setUTCHours(23, 59, 59, 999);

		console.log({ dayStart, dayEnd });

		const body = {
			query: {
				date_utc: {
					$gte: dayStart,
					$lte: dayEnd,
				},
			},
		};

		const res = await fetch(url, {
			method,
			headers: _header,
			body: JSON.stringify(body),
		}).then((res) => res.json());

		return res["docs"] ?? [];
	};

	return request;
};

export default useRequest;
