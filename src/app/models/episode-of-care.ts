export interface EpisodeOfCare {
	identifier?: string,
	status: "planned" | "waitlist" | "active" | "onhold" | "finished" | "cancelled" | "entered-in-error",
	statusHistory?: StatusHistory[],
	type?: CodeableConcept[],
	diagnosis?: Diagnosis[],
	patient: string, //referencia
	managingOrganization?: string, //referencia
	period?: Period,
	referralRequest?: Reference[], //referencia
	careManager?: string, //referencia
	team?: Reference[], //referencia
	account?: Reference[] //referencia
}

export interface Identifier {
	use?: "usual" | "official" | "temp" | "secondary" | "old",
	type?: CodeableConcept,
	system?: string,
	value?: string,
	period?: Period,
	assigner?: string //referencia
}

export interface CodeableConcept {
	coding?: Coding[],
	text?: string
}

export interface Reference{
	display?: string
}

export interface Coding {
	system?: string,
	version?: string,
	code?: string,
	display?: string,
	userSelected?: boolean,
}

export interface Period {
	start?: string,
	end?: string
}

export interface StatusHistory {
	status: "planned" | "waitlist" | "active" | "onhold" | "finished" | "cancelled" | "entered-in-error",
	period: Period
}

export interface Diagnosis {
	condition: string, //referencia
	role?: CodeableConcept,
	rank?: number
}
