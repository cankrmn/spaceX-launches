interface UseRequestArgs {
	date: Date;
}

const url = "https://api.spacexdata.com/v5/launches/query";

const useRequest = () => {
	// send request for getting the launches
	let _header = {
		"Content-Type": "application/json",
	};

	const request = async ({ date }: UseRequestArgs) => {
		const dayStart = new Date(date);
		dayStart.setUTCHours(0, 0, 0, 0);

		const dayEnd = new Date(date);
		dayEnd.setUTCHours(23, 59, 59, 999);

		const body = {
			query: {
				date_utc: {
					$gte: dayStart,
					$lte: dayEnd,
				},
			},
		};

		const res = await fetch(url, {
			method: "POST",
			headers: _header,
			body: JSON.stringify(body),
		})
			.then((res) => {
				if (res.status === 200) return undefined;
				return res.json();
			})
			.catch((err) => {
				return err;
			});

		if (!res) return [];

		return res["docs"] ?? [];
	};

	return request;
};

export default useRequest;
