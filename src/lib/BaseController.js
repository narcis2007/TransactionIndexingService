export default class BaseController {
  getDefaultPaginationConf(searchConf) {
    const defaultPaginationConf = {
      pageNumber: 1,
      pageSize: 24,
      sortBy: 'timestamp',
      sortDir: 'desc',
    };

    return {
      ...defaultPaginationConf,
      ...searchConf,
    };
  }
}
