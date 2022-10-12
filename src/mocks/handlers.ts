import { randomData } from './data';
import { rest } from 'msw';

export const handlers = [
  rest.get('/random', (req, res, ctx) => {
    const mainCategory = req.url.searchParams.get('mainCategory');
    const subCategories = req.url.searchParams.get('subCategories');
    console.log('mainCategory:', mainCategory, 'subCategories:', subCategories);

    return res(ctx.json(randomData));
  }),
];
