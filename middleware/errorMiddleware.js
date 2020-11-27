const CustomError = require('../helpers/customErrorHelper');

function mysqlErrorHandler(err, req, res, next) {
  // Token based error are handled by passport.js
  if (!['TokenExpiredError', 'JsonWebTokenError'].includes(err.name)) {
    if (err.code === 'ER_BAD_FIELD_ERROR')
      res.status(400).send(new CustomError(err.code, "Bad field inserted"));
    else if (err.code === 'ER_DATA_TOO_LONG')
      res.status(400).send(new CustomError(err.code, "Data too long"));
    else if (err.code === 'ERR_NOT_FOUND')
      res.status(401).send(new CustomError(err.code, "Data not found"));
    else if (err.code === 'ER_DUP_ENTRY')
      res.status(409).send(new CustomError(err.code, "Duplicate entry"));
    else if (err.code === 'ER_NO_REFERENCED_ROW_2')
      res.status(400).send(new CustomError(err.code, "Id is not related"));
    else if (err.code === 'ER_ROW_IS_REFERENCED_2')
      res.status(400).send(new CustomError(err.code, "Id is related to another data"));
    if (err.code)
      res.status(err.code).json(err);
    else
      res.status(500).json(new CustomError("ERR_SERVER", err.message, err.stack))
  }
}

module.exports = mysqlErrorHandler