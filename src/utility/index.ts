export * from "./jwt";
export * from "./enums/Roles";
export * from "./enums/Skill";
export * from "./enums/Status";
export * from "./file";

export const orderIncrease = <T>(arr: T[]) => {
	return arr && arr.length !== 0
		? arr.map((cat: any) => ({
				order: cat?.order,
		  }))
		: null;
};
