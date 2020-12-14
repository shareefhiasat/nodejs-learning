const people = ['wafa', 'alia', 'ronel', 'shareef'];
const ages = [12, 45, 67];

// console.log(people); auto prints when imported in other files

// module.exports = 'hello';
// module.exports = people;
module.exports = {
    people,
    ages: ages
};