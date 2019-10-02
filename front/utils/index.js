import ObjectID from "bson-objectid";

// returns a 24 character hex string
const createObjectID = () => ObjectID().str;

export const createEmptyAnswer = () => {
	return { _id: createObjectID(), value: "" };
};

export const createInitialAnswers = () => {
	return [
		{ _id: createObjectID(), value: "" },
		{ _id: createObjectID(), value: "" }
	];
};
