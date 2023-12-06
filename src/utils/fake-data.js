const USERS = [
  {
    id: 1,
    name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    DNI: "123456789",
    password: "hashedpassword1",
    salt: "somesalt1",
    isAdmin: true,
    isOperator: false,
  },
  {
    id: 2,
    name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    DNI: "987654321",
    password: "hashedpassword2",
    salt: "somesalt2",
    isAdmin: false,
    isOperator: true,
  },
  {
    id: 3,
    name: "Alice",
    last_name: "Johnson",
    email: "alice.johnson@example.com",
    DNI: "555555555",
    password: "hashedpassword3",
    salt: "somesalt3",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 4,
    name: "Bob",
    last_name: "Williams",
    email: "bob.williams@example.com",
    DNI: "111111111",
    password: "hashedpassword4",
    salt: "somesalt4",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 5,
    name: "Eva",
    last_name: "Anderson",
    email: "eva.anderson@example.com",
    DNI: "222222222",
    password: "hashedpassword5",
    salt: "somesalt5",
    isAdmin: true,
    isOperator: false,
  },
  {
    id: 6,
    name: "David",
    last_name: "Johnson",
    email: "david.johnson@example.com",
    DNI: "333333333",
    password: "hashedpassword6",
    salt: "somesalt6",
    isAdmin: false,
    isOperator: true,
  },
  {
    id: 7,
    name: "Linda",
    last_name: "Clark",
    email: "linda.clark@example.com",
    DNI: "444444444",
    password: "hashedpassword7",
    salt: "somesalt7",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 8,
    name: "Michael",
    last_name: "Jones",
    email: "michael.jones@example.com",
    DNI: "555555555",
    password: "hashedpassword8",
    salt: "somesalt8",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 9,
    name: "Sophia",
    last_name: "Martin",
    email: "sophia.martin@example.com",
    DNI: "666666666",
    password: "hashedpassword9",
    salt: "somesalt9",
    isAdmin: true,
    isOperator: false,
  },
  {
    id: 10,
    name: "Chris",
    last_name: "Taylor",
    email: "chris.taylor@example.com",
    DNI: "777777777",
    password: "hashedpassword10",
    salt: "somesalt10",
    isAdmin: false,
    isOperator: true,
  },
  {
    id: 11,
    name: "Olivia",
    last_name: "White",
    email: "olivia.white@example.com",
    DNI: "888888888",
    password: "hashedpassword11",
    salt: "somesalt11",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 12,
    name: "Daniel",
    last_name: "Harris",
    email: "daniel.harris@example.com",
    DNI: "999999999",
    password: "hashedpassword12",
    salt: "somesalt12",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 13,
    name: "Emily",
    last_name: "Young",
    email: "emily.young@example.com",
    DNI: "121212121",
    password: "hashedpassword13",
    salt: "somesalt13",
    isAdmin: true,
    isOperator: false,
  },
  {
    id: 14,
    name: "Ryan",
    last_name: "Scott",
    email: "ryan.scott@example.com",
    DNI: "131313131",
    password: "hashedpassword14",
    salt: "somesalt14",
    isAdmin: false,
    isOperator: true,
  },
  {
    id: 15,
    name: "Ava",
    last_name: "Walker",
    email: "ava.walker@example.com",
    DNI: "141414141",
    password: "hashedpassword15",
    salt: "somesalt15",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 16,
    name: "Matthew",
    last_name: "Evans",
    email: "matthew.evans@example.com",
    DNI: "151515151",
    password: "hashedpassword16",
    salt: "somesalt16",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 17,
    name: "Chloe",
    last_name: "Ward",
    email: "chloe.ward@example.com",
    DNI: "161616161",
    password: "hashedpassword17",
    salt: "somesalt17",
    isAdmin: true,
    isOperator: false,
  },
  {
    id: 18,
    name: "Brian",
    last_name: "Barnes",
    email: "brian.barnes@example.com",
    DNI: "171717171",
    password: "hashedpassword18",
    salt: "somesalt18",
    isAdmin: false,
    isOperator: true,
  },
  {
    id: 19,
    name: "Grace",
    last_name: "Parker",
    email: "grace.parker@example.com",
    DNI: "181818181",
    password: "hashedpassword19",
    salt: "somesalt19",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 20,
    name: "Owen",
    last_name: "Reed",
    email: "owen.reed@example.com",
    DNI: "191919191",
    password: "hashedpassword20",
    salt: "somesalt20",
    isAdmin: false,
    isOperator: false,
  },
];

const RESERVATIONS = [
  {
    user_id: 1,
    date: "2023-11-13T18:30:00",
    sucursal_id: 101,
    reservationNumber: 12345,
  },
  {
    user_id: 2,
    date: "2023-11-14T20:00:00",
    sucursal_id: 102,
    reservationNumber: 54321,
  },
  {
    user_id: 3,
    date: "2023-11-15T19:15:00",
    sucursal_id: 103,
    reservationNumber: 98765,
  },
  {
    user_id: 4,
    date: "2023-11-16T17:45:00",
    sucursal_id: 101,
    reservationNumber: 67890,
  },
  {
    user_id: 5,
    date: "2023-11-17T21:30:00",
    sucursal_id: 102,
    reservationNumber: 24680,
  },
  {
    user_id: 1,
    date: "2023-11-18T18:00:00",
    sucursal_id: 103,
    reservationNumber: 13579,
  },
  {
    user_id: 6,
    date: "2023-11-19T19:45:00",
    sucursal_id: 101,
    reservationNumber: 11223,
  },
  {
    user_id: 2,
    date: "2023-11-20T20:30:00",
    sucursal_id: 102,
    reservationNumber: 44556,
  },
  {
    user_id: 7,
    date: "2023-11-21T17:15:00",
    sucursal_id: 103,
    reservationNumber: 77889,
  },
  {
    user_id: 3,
    date: "2023-11-22T18:45:00",
    sucursal_id: 101,
    reservationNumber: 99011,
  },
  {
    user_id: 8,
    date: "2023-11-23T19:30:00",
    sucursal_id: 102,
    reservationNumber: 11234,
  },
  {
    user_id: 4,
    date: "2023-11-24T20:15:00",
    sucursal_id: 103,
    reservationNumber: 55667,
  },
  {
    user_id: 9,
    date: "2023-11-25T21:00:00",
    sucursal_id: 101,
    reservationNumber: 88990,
  },
  {
    user_id: 5,
    date: "2023-11-26T17:30:00",
    sucursal_id: 102,
    reservationNumber: 11222,
  },
  {
    user_id: 10,
    date: "2023-11-27T18:15:00",
    sucursal_id: 103,
    reservationNumber: 33445,
  },
  {
    user_id: 6,
    date: "2023-11-28T19:00:00",
    sucursal_id: 101,
    reservationNumber: 11222,
  },
  {
    user_id: 11,
    date: "2023-11-29T20:00:00",
    sucursal_id: 102,
    reservationNumber: 55678,
  },
  {
    user_id: 7,
    date: "2023-11-30T21:30:00",
    sucursal_id: 103,
    reservationNumber: 99887,
  },
  {
    user_id: 12,
    date: "2023-12-01T17:45:00",
    sucursal_id: 101,
    reservationNumber: 34567,
  },
  {
    user_id: 8,
    date: "2023-12-02T18:30:00",
    sucursal_id: 102,
    reservationNumber: 89012,
  },
];

const OPERATORS = [
  {
    name_and_lastname: "Operator 1",
    mail: "operator1@example.com",
    sucursal: "Branch A",
    password: "********",
  },
  {
    name_and_lastname: "Operator 2",
    mail: "operator2@example.com",
    sucursal: "Branch B",
    password: "********",
  },
  {
    name_and_lastname: "Operator 3",
    mail: "operator3@example.com",
    sucursal: "Branch C",
    password: "********",
  },
  {
    name_and_lastname: "Operator 4",
    mail: "operator4@example.com",
    sucursal: "Branch A",
    password: "********",
  },
  {
    name_and_lastname: "Operator 5",
    mail: "operator5@example.com",
    sucursal: "Branch B",
    password: "********",
  },
  {
    name_and_lastname: "Operator 6",
    mail: "operator6@example.com",
    sucursal: "Branch C",
    password: "********",
  },
  {
    name_and_lastname: "Operator 7",
    mail: "operator7@example.com",
    sucursal: "Branch A",
    password: "********",
  },
  {
    name_and_lastname: "Operator 8",
    mail: "operator8@example.com",
    sucursal: "Branch B",
    password: "********",
  },
  {
    name_and_lastname: "Operator 9",
    mail: "operator9@example.com",
    sucursal: "Branch C",
    password: "********",
  },
  {
    name_and_lastname: "Operator 10",
    mail: "operator10@example.com",
    sucursal: "Branch A",
    password: "********",
  },
  {
    name_and_lastname: "Operator 11",
    mail: "operator11@example.com",
    sucursal: "Branch B",
    password: "********",
  },
  {
    name_and_lastname: "Operator 12",
    mail: "operator12@example.com",
    sucursal: "Branch C",
    password: "********",
  },
  {
    name_and_lastname: "Operator 13",
    mail: "operator13@example.com",
    sucursal: "Branch A",
    password: "********",
  },
  {
    name_and_lastname: "Operator 14",
    mail: "operator14@example.com",
    sucursal: "Branch B",
    password: "********",
  },
  {
    name_and_lastname: "Operator 15",
    mail: "operator15@example.com",
    sucursal: "Branch C",
    password: "********",
  },
  {
    name_and_lastname: "Operator 16",
    mail: "operator16@example.com",
    sucursal: "Branch A",
    password: "********",
  },
  {
    name_and_lastname: "Operator 17",
    mail: "operator17@example.com",
    sucursal: "Branch B",
    password: "********",
  },
  {
    name_and_lastname: "Operator 18",
    mail: "operator18@example.com",
    sucursal: "Branch C",
    password: "********",
  },
  {
    name_and_lastname: "Operator 19",
    mail: "operator19@example.com",
    sucursal: "Branch A",
    password: "********",
  },
  {
    name_and_lastname: "Operator 20",
    mail: "operator20@example.com",
    sucursal: "Branch B",
    password: "********",
  },
];

const RESERVATIONS2 = [
  {
    name_and_lastname: "John Doe",
    date: "2023-11-13T18:30:00",
    sucursal_name: "Branch A",
    reservationNumber: 12345,
  },
  {
    name_and_lastname: "Alice Smith",
    date: "2023-11-14T19:00:00",
    sucursal_name: "Branch B",
    reservationNumber: 54321,
  },
  {
    name_and_lastname: "Bob Johnson",
    date: "2023-11-15T20:30:00",
    sucursal_name: "Branch C",
    reservationNumber: 67890,
  },
  {
    name_and_lastname: "Eva Williams",
    date: "2023-11-16T21:15:00",
    sucursal_name: "Branch D",
    reservationNumber: 98765,
  },
  {
    name_and_lastname: "Charlie Brown",
    date: "2023-11-17T18:45:00",
    sucursal_name: "Branch A",
    reservationNumber: 23456,
  },
  {
    name_and_lastname: "Grace Davis",
    date: "2023-11-18T19:30:00",
    sucursal_name: "Branch B",
    reservationNumber: 87654,
  },
  {
    name_and_lastname: "Daniel White",
    date: "2023-11-19T20:00:00",
    sucursal_name: "Branch C",
    reservationNumber: 13579,
  },
  {
    name_and_lastname: "Sophie Miller",
    date: "2023-11-20T21:45:00",
    sucursal_name: "Branch D",
    reservationNumber: 24680,
  },
  {
    name_and_lastname: "Liam Taylor",
    date: "2023-11-21T18:15:00",
    sucursal_name: "Branch A",
    reservationNumber: 11223,
  },
  {
    name_and_lastname: "Olivia Clark",
    date: "2023-11-22T19:45:00",
    sucursal_name: "Branch B",
    reservationNumber: 44556,
  },
  {
    name_and_lastname: "Mia Anderson",
    date: "2023-11-23T20:15:00",
    sucursal_name: "Branch C",
    reservationNumber: 77889,
  },
  {
    name_and_lastname: "Noah Harris",
    date: "2023-11-24T21:30:00",
    sucursal_name: "Branch D",
    reservationNumber: 99887,
  },
  {
    name_and_lastname: "Ava Martin",
    date: "2023-11-25T18:00:00",
    sucursal_name: "Branch A",
    reservationNumber: 33445,
  },
  {
    name_and_lastname: "Emma Rodriguez",
    date: "2023-11-26T19:15:00",
    sucursal_name: "Branch B",
    reservationNumber: 55667,
  },
  {
    name_and_lastname: "William Martinez",
    date: "2023-11-27T20:45:00",
    sucursal_name: "Branch C",
    reservationNumber: 77890,
  },
  {
    name_and_lastname: "Isabella King",
    date: "2023-11-28T21:00:00",
    sucursal_name: "Branch D",
    reservationNumber: 11234,
  },
  {
    name_and_lastname: "James Garcia",
    date: "2023-11-29T18:30:00",
    sucursal_name: "Branch A",
    reservationNumber: 44556,
  },
  {
    name_and_lastname: "Ella Lee",
    date: "2023-11-30T19:00:00",
    sucursal_name: "Branch B",
    reservationNumber: 66778,
  },
  {
    name_and_lastname: "Alexander Scott",
    date: "2023-12-01T20:30:00",
    sucursal_name: "Branch C",
    reservationNumber: 88900,
  },
];

const SUCURSALES = [
  {
    name: "Sucursal A",
    city: "Ciudad A",
    max_cap: 100,
    open_time_and_close: "9:00 AM to 6:00 PM",
  },
  {
    name: "Sucursal B",
    city: "Ciudad B",
    max_cap: 150,
    open_time_and_close: "8:30 AM to 7:00 PM",
  },
  {
    name: "Sucursal C",
    city: "Ciudad C",
    max_cap: 120,
    open_time_and_close: "10:00 AM to 5:30 PM",
  },
  {
    name: "Sucursal D",
    city: "Ciudad D",
    max_cap: 80,
    open_time_and_close: "9:30 AM to 6:30 PM",
  },
  {
    name: "Sucursal E",
    city: "Ciudad E",
    max_cap: 200,
    open_time_and_close: "8:00 AM to 8:00 PM",
  },
  {
    name: "Sucursal F",
    city: "Ciudad F",
    max_cap: 130,
    open_time_and_close: "10:30 AM to 5:00 PM",
  },
  {
    name: "Sucursal G",
    city: "Ciudad G",
    max_cap: 90,
    open_time_and_close: "9:00 AM to 6:30 PM",
  },
  {
    name: "Sucursal H",
    city: "Ciudad H",
    max_cap: 180,
    open_time_and_close: "8:30 AM to 7:30 PM",
  },
  {
    name: "Sucursal I",
    city: "Ciudad I",
    max_cap: 110,
    open_time_and_close: "10:00 AM to 6:00 PM",
  },
  {
    name: "Sucursal J",
    city: "Ciudad J",
    max_cap: 160,
    open_time_and_close: "8:00 AM to 8:00 PM",
  },
  {
    name: "Sucursal K",
    city: "Ciudad K",
    max_cap: 140,
    open_time_and_close: "9:30 AM to 7:30 PM",
  },
  {
    name: "Sucursal L",
    city: "Ciudad L",
    max_cap: 100,
    open_time_and_close: "10:30 AM to 5:30 PM",
  },
  {
    name: "Sucursal M",
    city: "Ciudad M",
    max_cap: 120,
    open_time_and_close: "9:00 AM to 6:00 PM",
  },
  {
    name: "Sucursal N",
    city: "Ciudad N",
    max_cap: 170,
    open_time_and_close: "8:30 AM to 7:00 PM",
  },
  {
    name: "Sucursal O",
    city: "Ciudad O",
    max_cap: 110,
    open_time_and_close: "10:00 AM to 6:30 PM",
  },
  {
    name: "Sucursal P",
    city: "Ciudad P",
    max_cap: 80,
    open_time_and_close: "9:30 AM to 7:00 PM",
  },
  {
    name: "Sucursal Q",
    city: "Ciudad Q",
    max_cap: 150,
    open_time_and_close: "8:00 AM to 8:00 PM",
  },
  {
    name: "Sucursal R",
    city: "Ciudad R",
    max_cap: 130,
    open_time_and_close: "10:30 AM to 6:30 PM",
  },
  {
    name: "Sucursal S",
    city: "Ciudad S",
    max_cap: 100,
    open_time_and_close: "9:00 AM to 5:30 PM",
  },
];

const BRANCHES = [
  {
    id: 101,
    name: "Sucursal A",
  },
  {
    id: 102,
    name: "Sucursal B",
  },
  {
    id: 103,
    name: "Sucursal C",
  },
  {
    id: 104,
    name: "Sucursal D",
  },
  {
    id: 105,
    name: "Sucursal E",
  },
  {
    id: 106,
    name: "Sucursal F",
  },
  {
    id: 107,
    name: "Sucursal G",
  },
  {
    id: 108,
    name: "Sucursal H",
  },
  {
    id: 109,
    name: "Sucursal I",
  },
  {
    id: 110,
    name: "Sucursal J",
  },
  {
    id: 111,
    name: "Sucursal K",
  },
  {
    id: 112,
    name: "Sucursal L",
  },
  {
    id: 113,
    name: "Sucursal M",
  },
  {
    id: 114,
    name: "Sucursal N",
  },
  {
    id: 115,
    name: "Sucursal O",
  },
  {
    id: 116,
    name: "Sucursal P",
  },
  {
    id: 117,
    name: "Sucursal Q",
  },
  {
    id: 118,
    name: "Sucursal R",
  },
  {
    id: 119,
    name: "Sucursal S",
  },
  {
    id: 120,
    name: "Sucursal T",
  },
];

class FakeData {
  constructor() {
    this.operators = OPERATORS;
    this.users = USERS;
    this.sucursales = SUCURSALES;
    this.reservations2 = RESERVATIONS2;
    this.branches = BRANCHES;
  }
  getUserReservations = (user_id) => {
    const results = [];
    results = this.reservations.filter(
      (reservation) => reservation.user_id == user_id
    );
    return results;
  };
  getBranch = (branch_id) => {
    return this.branches.filter((branch) => branch.id == branch_id);
  };
  getUser = (user_id) => {
    return this.users.filter((user) => user.id == user_id);
  };
  getUsers = () => this.users;
  getBranches = () => this.branches;
  getSucursales = () => this.sucursales;
  getReservations2 = () => this.reservations2;
  getOperators = () => this.operators;
}

export default new FakeData();
