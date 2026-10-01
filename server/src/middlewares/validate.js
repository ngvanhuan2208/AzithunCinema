function validate(schema, source = 'body') {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return res
        .status(400)
        .json({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Dữ liệu chưa hợp lệ.',
            issues: result.error.issues,
          },
        });
    }
    res.locals.validated = { ...res.locals.validated, [source]: result.data };
    next();
  };
}

module.exports = validate;
