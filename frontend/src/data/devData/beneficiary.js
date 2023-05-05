import { faker } from "@faker-js/faker";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newBeneficiaryData = () => {
  return {
    _id: faker.database.mongodbObjectId(),
    family_name: faker.name.lastName(),
    first_name: faker.name.firstName(),
    dob: faker.date.birthdate(),
    gender: faker.helpers.arrayElement(["MASCULINE", "FEMININE"]),
    id_number: faker.random.alphaNumeric(10).toLocaleUpperCase(),
    job_title: faker.name.jobTitle(),
    direction: faker.name.jobArea(),
    contract_type: faker.helpers.arrayElement(["CDD", "CDI", "INTERNSHIP"]),
    blood_group: faker.helpers.arrayElement([
      "O_POS",
      "O_NEG",
      "A_POS",
      "A_NEG",
      "B_POS",
      "B_NEG",
      "AB_POS",
      "AB_NEG",
    ]),
    profil: faker.lorem.words(1),
    remark: faker.lorem.words(3),
    index: faker.finance.amount(10, 40, 0),
    doc: faker.date.recent(60), // date of creation
    doe: faker.date.future(5), // date of expiration, expiry date
    created_at: faker.date.recent(60),
    created_by: faker.database.mongodbObjectId(),
    // picture,
    // qr_code: "",
  };
};

export function makeFakeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return newBeneficiaryData();
    });
  };

  return makeDataLevel();
}
