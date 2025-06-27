class APIFeatures {
  constructor(query, queryString) {
    this.query = query; 
    this.queryString = queryString; 
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach(el => delete queryObj[el]);

    // This will hold our final Mongoose query
    const mongoQuery = {};

    // Handle string fields with case-insensitivity
    if (queryObj.city) {
      mongoQuery.city = { $regex: queryObj.city, $options: 'i' };
    }
    if (queryObj.category) {
      mongoQuery.category = { $regex: queryObj.category, $options: 'i' };
    }

    // Handle price range
    const priceFilter = {};
    if (queryObj['price[gte]']) priceFilter.$gte = Number(queryObj['price[gte]']);
    if (queryObj['price[lte]']) priceFilter.$lte = Number(queryObj['price[lte]']);
    if (Object.keys(priceFilter).length > 0) {
      mongoQuery.price = priceFilter;
    }

    // Handle date range for `availableDates` array
    const dateFilter = {};
    if (queryObj.availableFrom) {
        // Find tours where at least one date in the array is >= availableFrom
        dateFilter.$gte = new Date(queryObj.availableFrom);
    }
    if (queryObj.availableTo) {
        // Find tours where at least one date in the array is <= availableTo
        dateFilter.$lte = new Date(queryObj.availableTo);
    }
    if (Object.keys(dateFilter).length > 0) {
      mongoQuery.availableDates = dateFilter;
    }

    this.query = this.query.find(mongoQuery);
    return this;
  }
  search() {
    if (this.queryString.search) {
      const searchRegex = new RegExp(this.queryString.search, 'i'); // 'i' for case-insensitive

      // Search across multiple fields for the partial match
      this.query = this.query.find({
        $or: [
          { title: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
          { city: { $regex: searchRegex } },
        ],
      });
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;