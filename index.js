module.exports = (model, _query) => {
    const query = Object.assign({}, _query);
    let endQuery = false;
    let second = null;
    return {
        next:() => {
            if (endQuery) return Promise.resolve();

            if (!second) return model
                .find(query)
                .limit(2)
                .sort({ _id:1 })
                .exec()
                .then(([ first, _second ]) => {
                    second = _second;
                    if (!first || !second) endQuery = true;

                    if (second) query._id = { $gt: second._id };

                    return first;
                });
            const res = second;
            second = null;
            return Promise.resolve(res);
        }
    };
};
