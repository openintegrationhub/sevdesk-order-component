# ![LOGO](logo.png) sevDesk Order API OIH Connector

## Description

[![Generic badge](https://img.shields.io/badge/Status-NotTested!-lightgrey.svg)](https://shields.io/)

A generated OIH connector for the sevDesk Order API (version 2.0.0).

Generated from: https://my.sevdesk.de/api/v1<br/>
Generated at: 2021-04-22T22:44:01+02:00

## API Description

## Authorization

Supported authorization schemes:

- API Key

## Actions

### Retrieve orders

> There are a multitude of parameter which can be used to filter. A few of them are attached but<br/> > <br/>
> for a complete list please check out <a href='https://5677.extern.sevdesk.dev/apiOverview/index.html#/doc-orders#filtering'>this</a> list<br/>

_Tags:_ `Order`

#### Input Parameters

- `status` - _optional_ - Status of the order<br/>
  Possible values: 100, 200, 300, 500, 750, 1000.
- `orderNumber` - _optional_ - Retrieve all orders with this order number<br/>
- `startDate` - _optional_ - Retrieve all orders with a date equal or higher<br/>
- `endDate` - _optional_ - Retrieve all orders with a date equal or lower<br/>
- `contact[id]` - _optional_ - Retrieve all orders with this contact. Must be provided with contact[objectName]<br/>
- `contact[objectName]` - _optional_ - Only required if contact[id] was provided. 'Contact' should be used as value.<br/>

### Create a new order

> Creates an order to which positions can be added later.<br/>

_Tags:_ `Order`

### Find order by ID

> Returns a single order<br/>

_Tags:_ `Order`

#### Input Parameters

- `orderId` - _required_ - ID of order to return<br/>

### Update an existing order

> Update an order<br/>

_Tags:_ `Order`

#### Input Parameters

- `orderId` - _required_ - ID of order to update<br/>

### Deletes an order

_Tags:_ `Order`

#### Input Parameters

- `orderId` - _required_ - Id of order resource to delete<br/>

### Retrieve order positions

> Retrieve all order positions depending on the filters defined in the query.<br/>

_Tags:_ `OrderPos`

#### Input Parameters

- `order[id]` - _optional_ - Retrieve all order positions belonging to this order. Must be provided with voucher[objectName]<br/>
- `order[objectName]` - _optional_ - Only required if order[id] was provided. 'Order' should be used as value.<br/>

### Create a new order position

> Creates an order position for an order.<br/>

_Tags:_ `OrderPos`

## License

: sevDeskOrder-Component<br/>
<br/>

All files of this connector are licensed under the Apache 2.0 License. For details
see the file LICENSE on the toplevel directory.
