interface Order {
  month: string;
  orders: number[];
}

interface OrdersData {
  [code: string]: Order[];
}

function convertTableToJson(table: string[][]): OrdersData {
  const headers = table[0].slice(1); // Remove the "Code" header
  const data: OrdersData = {};

  for (let i = 1; i < table.length; i++) {
      const row = table[i];
      const code = row[0];
      const orders: Order[] = [];

      for (let j = 1; j < row.length; j++) {
          const month = headers[j - 1];
          const orderValues = row[j].split(',').map(val => parseInt(val.trim()));
          const order: Order = { month, orders: orderValues };
          orders.push(order);
      }

      data[code] = orders;
  }

  return data;
}

// Example table data
const tableData: string[][] = [
  ['Code', 'January', 'February', 'March'],
  ['A', '10,20', '30,40', '50,60'],
  ['B', '15,25', '35,45', '55,65']
];

const jsonData = convertTableToJson(tableData);
console.log(jsonData);
