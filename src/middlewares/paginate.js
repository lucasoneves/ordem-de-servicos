import InvalidRequest from "../errors/InvalidRequest.js";

async function paginate(req, res, next) {
  try {
    let { limit = 5, page = 1, orderBy = "_id:-1" } = req.query;

    const [orderField, _order] = orderBy.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    orderBy = parseInt(_order);

    const result = req.result;
    const totalOrders = req.totalOrders;

    if (limit > 0 && page > 0) {
      const paginatedResult = await result
        .find()
        .sort({ [orderField]: _order })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      res.status(200).json({
        data: {
          totalOrders,
          perPage: paginatedResult.length,
          paginatedResult,
        },
      });
      
    } else {
      next(
        new InvalidRequest("Please, check your search query and try again.")
      );
    }
  } catch (error) {
    next(error);
  }
}

export default paginate;
