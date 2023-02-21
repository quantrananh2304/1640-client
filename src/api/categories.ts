import { sendGet } from 'utils/axios';

export const dataCategory = (() => {
  const categories = Array.from({ length: 23 }).map((_, i) => ({
    id: i,
    name: `ant design part ${i}`,
    date: `${i+1}/01/2023`,
    note:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  }));

  return categories;
})();

export const getCategories = () => Promise.resolve({
  data: dataCategory,
  message: 'null',
  error: null
});