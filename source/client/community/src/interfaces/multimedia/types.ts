import { resourceUsage } from "process";

export interface Image {
    url: string,
    path: string,
    id: string,
    size: number,
    ipfs: boolean,
}

export interface Video {
    url: string,
    path: string,
    id: string,
    size: number,
    ipfs: boolean,
}

export interface PostResult {
    path: string,
    statusCode: number,
    error: Error | null,
}
