import { faker } from "@faker-js/faker";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newConstantsData = () => {
  return {
    _id: faker.database.mongodbObjectId(),
    card_number: faker.random.alphaNumeric(14).toLocaleUpperCase(),
    temperature: faker.finance.amount(20, 45, 0),
    height: faker.finance.amount(145, 200, 0),
    weight: faker.finance.amount(40, 120, 0),
    pulse: faker.finance.amount(40, 120, 0),
    blood_pressure: faker.finance.amount(40, 120, 0),
    other: faker.lorem.words(10),
    created_at: faker.date.past(2),
  };
};

export function makeFakeConstantsData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return newConstantsData();
    });
  };

  return makeDataLevel();
}
