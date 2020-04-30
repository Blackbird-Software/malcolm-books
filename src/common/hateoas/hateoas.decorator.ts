import HateoasLinkInterface from './hateoas-link.interface';

export default function hateoas(toDecorate: any, links: HateoasLinkInterface[]): any {

    let formattedLinks: any[] = [];
    for (const link of links) {
        const linkName = link.name;
        const hateoasLink = {href: link.href, method: link.method};
        formattedLinks = {...formattedLinks, ...{[linkName]: hateoasLink}};
    }

    return {...toDecorate, ...{_links: formattedLinks}};
}
