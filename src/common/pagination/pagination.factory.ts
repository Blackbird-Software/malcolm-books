import PaginatedResponseInterface from './paginated-response.interface';
import PaginatedResponse from './paginated-response';
import PaginationLinksFactory from './pagination-links.factory';
import {SelectQueryBuilder} from 'typeorm';
import {PaginationParamsDto} from './dto/pagination-params.dto';

export default class PaginationFactory {

    private linksFactory: PaginationLinksFactory;
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
        this.linksFactory = new PaginationLinksFactory(qb, paginationParams, routeParams);
    }

    async createPaginatedResponse(): Promise<PaginatedResponseInterface> {

        const {page, perPage} = this.paginationParams;
        const links = await this.linksFactory.createLinks();

        this.qb.offset(perPage * (page - 1));
        this.qb.limit(perPage);

        const items = await this.qb.getMany();

        return new PaginatedResponse(
            items,
            page,
            perPage,
            links,
        );
    }
}
