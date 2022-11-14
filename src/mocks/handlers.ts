import { questionData, randomData } from './data';
import { rest } from 'msw';

const baseURL = process.env.BASE_URL;

export const handlers = [
  rest.get('/random', (req, res, ctx) => {
    const mainCategory = req.url.searchParams.get('mainCategory');
    const subCategories = req.url.searchParams.get('subCategories');
    console.log('mainCategory:', mainCategory, 'subCategories:', subCategories);

    return res(ctx.json(randomData));
  }),
  rest.get(`${baseURL}/questions`, (req, res, ctx) => {
    const PAGE_SIZE = 20;

    const mainCategory = req.url.searchParams.get('mainCategory');
    const subCategory = req.url.searchParams.get('subCategory');
    const page = Number(req.url.searchParams.get('page'));
    console.log('mainCategory:', mainCategory, 'subCategories:', subCategory, 'page: ', page);

    return res(
      ctx.json({
        ...questionData,
        content: questionData.content.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
      }),
    );
  }),
];
