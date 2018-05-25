# infinity-cursor-mongoose
module to iterate over a query in mongoose


# Usage

```js
const cursor = require('infinity-cursor-mongoose')
const schema = new mongoose.Schema({
    prop: Number
});

mongoose.model('user', schema);

await mongoose.models.user.create({
    prop:1
});
await mongoose.models.user.create({
    prop:2
});
await mongoose.models.user.create({
    prop:3
});
await mongoose.models.user.create({
    prop:4
});
await mongoose.models.user.create({
    prop:5
});

const { next } = cursor(mongoose.models.user, {});
const first = await next();
assert(first.prop === 1);

const second = await next();
assert(second.prop === 2);

const third = await next();
assert(third.prop === 3);

const fourth = await next();
assert(fourth.prop === 4);

const fifth = await next();
assert(fifth.prop === 5);

const nomore = await next();
assert(!nomore);
```

# API cursor(model, query) -> {next}