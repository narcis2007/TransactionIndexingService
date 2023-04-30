export default class MongooseAdapterModel {
  static async create(data) {
    const instance = new this({
      ...data,
    });
    return (await instance.save()).toObject();
  }

  static async findPaginated(filter, pagination, sortOptions, opts = { readPreference: 'secondaryPreferred' }) {
    return this.convertAdapterPageToAppPage(await this.paginate(filter, {
      page: pagination.pageNumber || 1,
      limit: pagination.pageSize || 24,
      sort: sortOptions,
      read: {
        pref: opts.readPreference,
      },
    }));
  }

  static convertAdapterPageToAppPage(adapterPage) {
    const pageInfo = {
      itemsAvailable: adapterPage.totalDocs,
      pageSize: adapterPage.limit,
      pageNumber: adapterPage.page,
      totalPages: adapterPage.totalPages,
      hasPrevPage: adapterPage.hasPrevPage,
      hasNextPage: adapterPage.hasNextPage,
      prevPageNumber: adapterPage.prevPage,
      nextPageNumber: adapterPage.nextPage,
    };
    return {
      pageInfo,
      items: adapterPage.docs,
    };
  }
}
