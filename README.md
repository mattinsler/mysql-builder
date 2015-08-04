# mysql-builder

Easily create/configure a MySQL client

## Installation
```
npm install --save mysql mysql-builder
```

## Usage

```javascript
var mysql = require('mysql');
var builder = require('mysql-builder')(mysql);

// create a client from a URL
var client = builder('mysql://localhost:3306/mydb');
var client = builder('mysql://foo:bar@localhost:3306/mydb');

// create a pool from a URL
var pool = builder.pool('mysql://localhost:3306/mydb');
var pool = builder.pool('mysql://localhost:3306/mydb', {connectionLimit: 10});
```

## License
Copyright (c) 2015 Matt Insler  
Licensed under the MIT license.
