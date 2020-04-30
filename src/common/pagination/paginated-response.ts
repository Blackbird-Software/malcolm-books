import PaginatedResponseInterface from './paginated-response.interface';
import PaginationLinksInterface from './pagination-links.interface';

export default class PaginatedResponse implements PaginatedResponseInterface {

    page: number;
    perPage: number;

    items: any[];
    total: number;

    _links: PaginationLinksInterface;

    public static DEFAULT_PER_PAGE = 25;
    public static DEFAULT_PAGE = 1;

    constructor(items: any[], total: number, page: number, perPage: number, links: PaginationLinksInterface) {
        this.items = items;
        this.total = total;
        this.page = page || PaginatedResponse.DEFAULT_PAGE;
        this.perPage = perPage || PaginatedResponse.DEFAULT_PER_PAGE;
        this._links = links;
    }

    createResponse(): any {

        return {
            items: this.items,
            total: this.total,

            page: this.page,
            perPage: this.perPage,

            _links: {
                first: this._links.first,
                last: this._links.last,
                prev: this._links.prev,
                next: this._links.next,
            },
        };
    }
}
