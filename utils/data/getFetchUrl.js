import { server } from '../../utils/server';

    export const getFetchUrl = (query, languageCulture) => {
        const cid = query.cid !== undefined ? 'categoryFilter='+query.cid : '';
        const sortOrder = query.sortOrder !== undefined ? '&sortOrder='+query.sortOrder : '';
        const limit = query.limit !== undefined ? '&limit='+query.limit : '';
        const tagFilters = query.tagFilters !== undefined ? '&tagFilters='+query.tagFilters : '';
        const searchFilter = query.searchFilter !== undefined ? '&searchFilter='+query.searchFilter : '';
        const lang = languageCulture !== undefined ? '&languageCulture='+languageCulture : '';

        return `${server}/products?${cid}${sortOrder}${limit}${tagFilters}${searchFilter}${lang}`;
    }