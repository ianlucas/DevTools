module.exports = [
  {
    infobox: [
      {
        key: 'ID',
        value: '1'
      }
    ],
    id: '1',
    group: '1',
    name: 'GetCustomerInfo',
    alias: 'Edward Norton',
    endpoint: 'http://example.com/customer',
    request: '{"id":"3","role":"customer"}',
    response: '{"active":true,"name":"Edward Norton","createdAt":1265068800000,"updatedAt":1288322480000,"history":[{"id":"233421","type":"product"}]}',
    type: 'json',
    icon: '✔️',
    requestTime: {
      epoch: +new Date('2010/10/01 23:15:00'),
      dateText: '01/10/2010',
      timeText: '23:15:00'
    },
    responseTime: {
      epoch: +new Date('2010/10/01 23:16:10'),
      dateText: '01/10/2010',
      timeText: '23:16:10'
    }
  },

  {
    infobox: [
      {
        key: 'ID',
        value: '1'
      }
    ],
    id: '2',
    group: '1',
    name: 'GetCustomerInfo',
    alias: 'John Doe',
    endpoint: 'http://example.com/customer',
    request: '{"id":"4","role":"customer"}',
    response: '{"active":false,"name":"John Doe","createdAt":1265068800000,"updatedAt":1288322480000,"history":[{"id":"13348","type":"product"}]}',
    type: 'json',
    icon: '❌',
    requestTime: {
      epoch: +new Date('2010/10/01 23:23:00'),
      dateText: '01/10/2010',
      timeText: '23:23:00'
    },
    responseTime: {
      epoch: +new Date('2010/10/01 23:23:34'),
      dateText: '01/10/2010',
      timeText: '23:23:34'
    }
  },

  {
    infobox: [
      {
        key: 'ID',
        value: '2'
      }
    ],
    id: '3',
    group: '2',
    name: 'CreateProduct',
    endpoint: 'http://example.com/product',
    request: '{"product":{"name":"Wireless Mice","price":123.03,"discount":null},"settings":{"enabled":false}}',
    response: '{"status":"created","id":"4348323"}',
    type: 'json',
    requestTime: {
      epoch: +new Date('2010/10/01 23:15:00'),
      dateText: '01/10/2010',
      timeText: '23:15:00'
    },
    responseTime: {
      epoch: +new Date('2010/10/01 23:16:10'),
      dateText: '01/10/2010',
      timeText: '23:16:10'
    }
  },

  {
    infobox: [
      {
        key: 'ID',
        value: '2'
      }
    ],
    info: [
      {
        key: 'Description',
        value: 'For this status, the product is not available to buy, you should offer other stuff.'
      },
      {
        key: 'Reasons for this error',
        value: [
          'The database connection is down;',
          'The product is disabled;',
          'The product is out of its buy period.'
        ]
      }
    ],
    alerts: [
      'This service should not be called too many times in your script.',
      'This is a testing API, it should not be used in production.'
    ],
    errors: [
      'The token key was not passed in the request, this should return an error!'
    ],
    id: '4',
    group: '2',
    name: 'ValidateProduct',
    endpoint: 'http://example.com/product/validate',
    request: '{"id":"4348323"}',
    response: '{"status":"created","statusText":"This product is not available right now."}',
    type: 'json',
    highlight: true,
    requestTime: {
      epoch: +new Date('2010/10/01 23:16:15'),
      dateText: '01/10/2010',
      timeText: '23:16:15'
    },
    responseTime: {
      epoch: +new Date('2010/10/01 23:16:23'),
      dateText: '01/10/2010',
      timeText: '23:16:23'
    }
  },

  {
    infobox: [
      {
        key: 'ID',
        value: '1'
      }
    ],
    id: '5',
    group: '1',
    name: 'GetCustomerInfo',
    alias: 'Edward Norton',
    endpoint: 'http://example.com/customer',
    request: '{"id":"3","role":"customer"}',
    response: '{"active":true,"name":"Edward Norton","createdAt":1265068800000,"updatedAt":1288322480000,"history":[{"id":"233421","type":"product"}]}',
    type: 'json',
    icon: '✔️',
    requestTime: {
      epoch: +new Date('2010/10/01 23:26:30'),
      dateText: '01/10/2010',
      timeText: '23:26:30'
    },
    responseTime: {
      epoch: +new Date('2010/10/01 23:26:55'),
      dateText: '01/10/2010',
      timeText: '23:26:55'
    }
  },

  {
    infobox: [
      {
        key: 'ID',
        value: '2'
      }
    ],
    id: '6',
    group: '2',
    name: 'GetProducts',
    endpoint: 'http://example.com/product/validate',
    request: '<request><client-id>3</client-id></request>',
    response: '<response><product><name>iPineapple Phone 3X</name><price>122.0</price></product></response>',
    type: 'xml',
    requestTime: {
      epoch: +new Date('2010/10/01 23:40:15'),
      dateText: '01/10/2010',
      timeText: '23:40:15'
    },
    responseTime: {
      epoch: +new Date('2010/10/01 23:40:23'),
      dateText: '01/10/2010',
      timeText: '23:40:23'
    }
  }
]
