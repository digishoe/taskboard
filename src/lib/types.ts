export interface Board {
	id: number;
	name: string;
	columns?: Column[];
}

export interface Column {
	id: number;
	board_id: number;
	name: string;
	position: number;
	tasks?: Task[];
}

export interface Task {
	id: number;
	column_id: number;
	title: string;
	description: string;
	position: number;
	tags?: Tag[];
}

export interface Tag {
	id: number;
	name: string;
	color: string;
}
