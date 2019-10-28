// Map through the expenses & income array
// Store ownerNames for each expense / income in the corresponding array
// Combine the 2 arrays into one and generate Set to remove duplicates
const getUserNamesSet = ([expensesArray, incomeArray]) => {
  const expensesNames = expensesArray.map(expense => expense.ownerName);
  const incomeNames = incomeArray.map(income => income.ownerName);
  return new Set([...expensesNames, ...incomeNames]);
};

// For each name in the userNameSet -> map through expenses and income arrays
// and pull out any record for that user
// Create an object that hold the users name, expenses and income data
// Add the object to the dataForUsers array
// Once all names have been checked, return the dataForUsers array
const getDataForUsers = (usernameSet, expensesArray, incomeArray) => {
  const dataForUsers = [];

  usernameSet.forEach(name => {
    const userExpenses = expensesArray.filter(
      expense => expense.ownerName === name
    );
    const userIncome = incomeArray.filter(income => income.ownerName === name);
    const userData = {
      name,
      expenses: userExpenses,
      income: userIncome
    };
    dataForUsers.push(userData);
  });

  return dataForUsers;
};

// Further reduce the filtered data to return an array of
// user objects with just names and their total amounts for expenses and income
const getTotalsByUser = (usersArray, getTotalFn) => {
  const data = [];

  usersArray.map(userObject => {
    const user = {
      name: userObject.name,
      expensesTotal: getTotalFn(userObject.expenses),
      incomeTotal: getTotalFn(userObject.income)
    };

    data.push(user);
  });
  return data;
};

export { getUserNamesSet, getDataForUsers, getTotalsByUser };
