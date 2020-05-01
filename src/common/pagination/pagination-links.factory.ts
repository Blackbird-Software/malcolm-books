import {Injectable} from '@nestjs/common';
import PaginationLinks from './pagination-links';
import {SelectQueryBuilder} from 'typeorm';
import {PaginationParamsDto} from './dto/pagination-params.dto';
import PaginatedResponse from './paginated-response';

@Injectable()
export default class PaginationLinksFactory {

    private readonly qb: SelectQueryBuilder<any>;
    private readonly total: number;
    private readonly page: number;
    private readonly perPage: number;
    private readonly routeParams: { path: string, params?: any[] };

    constructor(
        qb: SelectQueryBuilder<any>,
        total: number,
        paginationParams: PaginationParamsDto,
        routeParams: { path: string, params?: any[] },
    ) {
        this.qb = qb;
        this.total = total;
        this.routeParams = routeParams;
        this.page = paginationParams.page || PaginatedResponse.DEFAULT_PAGE;
        this.perPage = paginationParams.perPage || PaginatedResponse.DEFAULT_PER_PAGE;
    }

    async createLinks(): Promise<PaginationLinks> {

        const first = 1;
        const last = Math.ceil(this.total / this.perPage);
        let prev = null;
        let next = null;

        if (this.page > 1) {
            prev = this.page - 1;
        }

        if (this.page + 1 <= last) {
            next = this.page + 1;
        }

        return new PaginationLinks(
            this.generateUrl(first),
            this.generateUrl(last),
            prev ? this.generateUrl(prev) : null,
            next ? this.generateUrl(next) : null,
        );
    }

    private generateUrl(page: number): string {

        const params = new URLSearchParams({
            page: page.toString(),
            perPage: this.perPage.toString(),
        });

        return this.routeParams.path + '?' + params;
    }
}
