const { query } = require('express');
const Products = require('../model/productModel');

exports.getAllproducts = async (req, res) => {
  try {
    const data = await Products.find();
    res.status(200).json({
      status: 'success',
      total: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      Error: err.message,
    });
  }
};
exports.initialize = async (req, res) => {
  try {
    const result = await fetch(
      'https://s3.amazonaws.com/roxiler.com/product_transaction.json'
    );
    const data = await result.json();

    const doc = await Products.insertMany(data);

    res.status(200).json({ status: 'success', doc });
  } catch (err) {
    res.status(500).json({ status: 'Failed' });
  }
};

exports.transcations = async (req, res) => {
  try {
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let skip = (page - 1) * limit;
    // const data = await Products.find().skip(skip).limit(limit);
    let month = 3; //Default march

    if (req.query.month) {
      month = Number(req.query.month);
    }
    if (month < 10) month = `0${month}`;

    let data = await Products.find();
    let result = data.filter((obj) => {
      return obj.dateOfSale.includes(`-${month}-`);
    });
    if (req.query.search) {
      result = result.filter((obj) => {
        if (obj.title.includes(req.query.search)) return true;
        if (obj.category.includes(req.query.search)) return true;
        if (obj.price == req.query.search) return true;
        if (obj.description.includes(req.query.search)) return true;
        else false;
      });
    }

    res.status(200).json({
      status: 'success',
      total: result.length,
      result,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      Error: err.message,
    });
  }
};

exports.statistics = async (req, res) => {
  try {
    let month = 3; //Default march

    if (req.query.month) {
      month = Number(req.query.month);
    }
    if (month < 10) month = `0${month}`;

    let data = await Products.find();
    let result = data.filter((obj) => {
      return obj.dateOfSale.includes(`-${month}-`);
    });
    let amount = 0;
    let sold = 0;
    let notSold = 0;
    result.forEach((obj) => {
      amount += obj.price;
      obj.sold ? sold++ : notSold++;
    });

    res.status(200).json({
      status: 'success',
      statistics: {
        amount,
        sold,
        notSold,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      Error: err.message,
    });
  }
};

exports.barChartStats = async (req, res) => {
  try {
    let month = 3; //Default march

    if (req.query.month) {
      month = Number(req.query.month);
    }
    if (month < 10) month = `0${month}`;

    let data = await Products.find();
    let result = data.filter((obj) => {
      return obj.dateOfSale.includes(`-${month}-`);
    });

    let chartData = {
      '0-100': 0,
      '101-200': 0,
      '201-300': 0,
      '301-400': 0,
      '401-500': 0,
      '501-600': 0,
      '601-700': 0,
      '701-800': 0,
      '801-900': 0,
      '901-above': 0,
    };
    result.forEach((obj) => {
      const price = obj.price;

      if (price <= 100) {
        chartData['0-100']++;
      } else if (price > 100 && price <= 200) {
        chartData['101-200']++;
      } else if (price > 200 && price <= 300) {
        chartData['201-300']++;
      } else if (price > 300 && price <= 400) {
        chartData['301-400']++;
      } else if (price > 400 && price <= 500) {
        chartData['401-500']++;
      } else if (price > 500 && price <= 600) {
        chartData['501-600']++;
      } else if (price > 600 && price <= 700) {
        chartData['601-700']++;
      } else if (price > 700 && price <= 800) {
        chartData['701-800']++;
      } else if (price > 800 && price <= 900) {
        chartData['801-900']++;
      } else if (price > 900) {
        chartData['901-above']++;
      }
    });

    res.status(200).json({
      status: 'success',
      chartData,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      Error: err.message,
    });
  }
};

exports.uniqueCategories = async (req, res) => {
  try {
    let month = 3; //Default march

    if (req.query.month) {
      month = Number(req.query.month);
    }
    if (month < 10) month = `0${month}`;

    let data = await Products.find();
    let result = data.filter((obj) => {
      return obj.dateOfSale.includes(`-${month}-`);
    });

    let categories = {};
    result.forEach((obj) => {
      if (categories[obj.category]) {
        categories[obj.category]++;
      } else {
        categories[obj.category] = 1;
      }
    });

    res.status(200).json({
      status: 'success',
      categories,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      Error: err.message,
    });
  }
};

exports.combinedResult = async (req, res) => {
  try {
    let month = 3; //Default march

    if (req.query.month) {
      month = Number(req.query.month);
    }
    if (month < 10) month = `0${month}`;

    const [categoriesData, chartStatsData, statisticsData] = await Promise.all([
      fetch(`http://127.0.0.1:3000/categories?month=${month}`).then((result) =>
        result.json()
      ),
      fetch(`http://127.0.0.1:3000/bar-chart-stats?month=${month}`).then(
        (result) => result.json()
      ),
      fetch(`http://127.0.0.1:3000/statistics?month=${month}`).then((result) =>
        result.json()
      ),
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        categoriesData,
        chartStatsData,
        statisticsData,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      Error: err.message,
    });
  }
};
