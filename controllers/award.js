const app = require("express").Router();
const { verifyUserToken } = require("~/middlewares/auth");

const Award = require("~/models/award");

app.get("/", verifyUserToken, async (req, res) => {
  const meta = {
    limit:
      !req.query.limit || req.query.limit == undefined
        ? 5
        : parseInt(req.query.limit),
    page:
      !req.query.page || req.query.page == undefined
        ? 1
        : parseInt(req.query.page),
    type:
      !req.query.type || req.query.type == undefined ? null : req.query.type,
    pointNeeded:
      !req.query.pointNeeded || req.query.pointNeeded == undefined
        ? 9999
        : parseInt(req.query.pointNeeded),
  };

  const query = {};

  if (meta.type) query.type = { $in: meta.type };
  if (meta.pointNeeded) query.pointNeeded = { $lte: meta.pointNeeded };

  const options = {
    page: meta.page,
    limit: meta.limit,
  };

  const result = await Award.paginate(query, options);
  result.meta = meta;

  res.json({ status: "OK", result });
});

module.exports = app;
