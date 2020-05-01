import PaginatedResponseInterface from './paginated-response.interface';
import PaginatedResponse from './paginated-response';
import PaginationLinksFactory from './pagination-links.factory';
import {SelectQueryBuilder} from 'typeorm';
import {PaginationParamsDto} from './dto/pagination-params.dto';

export default class PaginationFactory {

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

    async createPaginatedResponse(): Promise<PaginatedResponseInterface> {

        const page = this.paginationParams.page || PaginatedResponse.DEFAULT_PAGE;
        const perPage = this.paginationParams.perPage || PaginatedResponse.DEFAULT_PER_PAGE;

        const items = await this.qb
            .offset(perPage * (page - 1))
            .limit(perPage)
            .getMany();

        const total = await this.qb
            .where('1=1')
            .getCount();

        const linksFactory = new PaginationLinksFactory(this.qb, total, this.paginationParams, this.routeParams);
        const links = await linksFactory.createLinks();

        return new PaginatedResponse(
            items,
            total,
            page,
            perPage,
            links,
        );
    }
}
