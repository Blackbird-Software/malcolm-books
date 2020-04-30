import {Injectable} from '@nestjs/common';
import PaginationLinks from './pagination-links';
import {SelectQueryBuilder} from 'typeorm';
import {PaginationParamsDto} from './dto/pagination-params.dto';

@Injectable()
export default class PaginationLinksFactory {

    private readonly qb: SelectQueryBuilder<any>;
    private readonly paginationParams: PaginationParamsDto;
    private readonly routeParams: { path: string, params?: any[] };

    constructor(
        qb: SelectQueryBuilder<any>,
        paginationParams: PaginationParamsDto,
        routeParams: { path: string, params?: any[] },
    ) {
        this.qb = qb;
        this.paginationParams = paginationParams;
        this.routeParams = routeParams;
    }

    async createLinks(): Promise<PaginationLinks> {

        const {page, perPage} = this.paginationParams;
        const total = await this.qb
            .where('1=1')
            .getCount();

        const first = 1;
        const last = Math.ceil(total / perPage);
        let prev = null;
        let next = null;

        if (page > 1) {
            prev = page - 1;
        }

        if (page + 1 <= last) {
            next = page + 1;
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
            perPage: this.paginationParams.perPage.toString(),
        });

        return this.routeParams.path + '?' + params;
    }
}
