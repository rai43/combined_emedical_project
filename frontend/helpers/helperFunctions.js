export const addDays = (date, days) => {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
};

export const containFilterParams = {
	filterOptions: ['contains', 'notContains'],
	debounceMs: 200,
	maxNumConditions: 1,
};

export class userException extends Error {
	constructor(message, errorCode) {
		super(message); // Add a 'message' property
		this.code = errorCode;
	}
}
// export const userException = (message, code) => {
// 	this.message = message;
// 	this.code = code || 0;
// };
