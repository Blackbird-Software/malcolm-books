import PaginationLinksInterface from './pagination-links.interface';

export default interface PaginatedResponseInterface {
    readonly perPage: number;
    readonly page: number;

    readonly links: PaginationLinksInterface;

    readonly items: any[];
    readonly total: number;

    createResponse(): any;
}
