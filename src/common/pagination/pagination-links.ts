import PaginationLinksInterface from './pagination-links.interface';

export default class PaginationLinks implements PaginationLinksInterface {
    first: string;
    last: string;
    next: string;
    prev: string;

    constructor(first: string, last: string, prev: string, next: string) {
        this.first = first;
        this.last = last;
        this.prev = prev;
        this.next = next;
    }
}
