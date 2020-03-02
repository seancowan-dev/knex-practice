const dotenv = require('dotenv');
dotenv.config();
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

// function getAllText(search) {
//     knexInstance.select('id', 'name', 'price', 'category', 'checked', 'date_added')
//     .from('shopping_list')
//     .where('name', 'ILIKE', `%${search}%`)
//     .then(result => {
//         console.log(result)
//     })
// }

// getAllText('Chicken');

// function getPage(pageNumber) {
//     const perPage = 6
//     const offset = perPage * (pageNumber - 1)
//     knexInstance.select('id', 'name', 'price', 'category', 'checked', 'date_added')
//     .from('shopping_list')
//     .limit(perPage)
//     .offset(offset)
//     .then(result => {
//         console.log(result)
//     })
// }

// getPage(2);

// function getAfterDate(daysAgo) {
//     knexInstance.select('id', 'name', 'price', 'category', 'checked', 'date_added')
//     .from('shopping_list')
//     .where('date_added',
//     '>',
//     knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
//     )
//     .then(result => {
//         console.log(result) 
//     })
// }

// getAfterDate(10);

function getCategoryPriceTotals() {
    knexInstance.select('category')
    .sum('price AS total')
    .from('shopping_list')
    .groupBy('category')
    .orderBy([
        { column: 'category', order: 'ASC' },
        { column: 'total', order: 'DESC' },
      ])
    .then(result => {
        console.log(result)
    })

}

getCategoryPriceTotals();