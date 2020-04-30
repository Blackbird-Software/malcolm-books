import PaginatedResponseInterface from './paginated-response.interface';
import PaginationLinksInterface from './pagination-links.interface';

export default class PaginatedResponse implements PaginatedResponseInterface {

    page: number;
    perPage: number;

    items: any[];
    total: number;

    links: PaginationLinksInterface;

    public static DEFAULT_PER_PAGE = 25;
    public static DEFAULT_PAGE = 1;

    constructor(items: any[], page: number, perPage: number, links: PaginationLinksInterface) {
        this.items = items;
        this.total = items.length;
        this.page = page || PaginatedResponse.DEFAULT_PAGE;
        this.perPage = perPage || PaginatedResponse.DEFAULT_PER_PAGE;
        this.links = links;
    }

    createResponse(): any {

        return {
            items: this.items,
            count: this.total,

            page: this.page,
            perPage: this.perPage,

            links: {
                first: this.links.first,
                last: this.links.last,
                prev: this.links.prev,
                next: this.links.next,
            },
        };
    }
}
