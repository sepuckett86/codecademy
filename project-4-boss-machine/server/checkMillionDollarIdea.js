// This function will make sure that any new or updated ideas are
// still worth at least one million dollars!
// The total value of an idea is the product of its numWeeks
// and weeklyRevenue properties.


const checkMillionDollarIdea = (req, res, next) => {
  // Declare new idea data
  let newData = req.body;
  const numWeeks = Number(newData.numWeeks);
  const weeklyRevenue = Number(newData.weeklyRevenue);
  if (!numWeeks || !weeklyRevenue || typeof numWeeks !== 'number' || typeof weeklyRevenue !== 'number') {
    return res.status(400).send('numWeeks or weeklyRevenue not supplied or incorrect data type');
  }
  const totalValue = numWeeks * weeklyRevenue;
  if (totalValue) {
    if (totalValue < 1000000) {
      return res.status(400).send('Idea worth less than one million dollars');
    }
  }
  next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
