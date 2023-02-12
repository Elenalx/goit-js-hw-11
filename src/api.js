
// const options = {
//     heders: {
//         Authorization: `10499035-4c19632db287de98b060ef18d`,
//     },
// };
// const url = (`https://pixabay.com/api/&q=cat&image_type=photo`)
//     .then((res) => {
//         console.log(res);
//         return res.json();
//     })
//     .then(console.log)
//     .catch(console.log);

// fetch("https://pixabay.com/api/?key=10499035-4c19632db287de98b060ef18d&q=cat&image_type=photo")
//   .then(res => console.log(res));

fetch("https://pixabay.com/api/?key=10499035-4c19632db287de98b060ef18d&q=cat&image_type=photo")
  
  .then((res) => res.json())
  .then((data) => console.log(data));