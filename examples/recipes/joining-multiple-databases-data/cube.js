const BigQueryDriver = require('@cubejs-backend/bigquery-driver');
const PostgresDriver = require('@cubejs-backend/postgres-driver');

function bigquery() {
  return new BigQueryDriver({
    projectId: 'cube-cloud-staging',
    exportBucket: 'cube-cloud-staging-export-bucket',
    keyFilename: '/Users/cristipp/.gcloud.key',
  })
}

function postgres() {
  return new PostgresDriver({
    database: 'ecom',
    host: 'localhost',
    user: 'test',
    password: 'test',
    port: '5432',
  })
}

module.exports = {
  dbType: ({ dataSource }) => {
    console.log('QQQ dbType', dataSource)
    switch (dataSource) {
      case 'default': return 'postgres';
      case 'suppliers': return 'postgres';
      case 'products': return 'bigquery';
      default: throw new Error('dbType: dataSource is undefined');
    }
  },

  driverFactory: ({ dataSource }) => {
    console.log('QQQ driverFactory', dataSource)
    switch (dataSource) {
      case 'suppliers': return postgres();
      case 'products': return bigquery();
      default: throw new Error('driverFactory: dataSource is undefined');
    }
  },
};