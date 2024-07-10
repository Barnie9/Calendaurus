export type User = {
    name: string;
    email: string;
    token: string;
};

export type FilterDto = {
    types: string[];
    startTime: string;
    endTime: string;
};

export type Cell = {
    row: number;
    column: number;
};

export type CalendarEntry = {
    id?: string;
    title: string;
    description?: string;
    location?: string;
    color?: string;
    startTime: string;
    endTime: string;
    type: string;
};