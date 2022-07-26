const Order = require('../model/order');
const Item= require('../model/item');

//implement pagination
const myCustomLabels = {
    totalDocs: 'total items',
    docs: 'itemsList',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next page No ',
    prevPage: 'previous page No',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
    meta: 'paginator',
  };
  const index=(req, res,next)=>{
    if(req.query.page && req.query.limit){
      Item.paginate({},{page:req.query.page,limit: req.query.limit,customLabels: myCustomLabels})
      .then(data=> {
        res.status(200).json({data})
       
      })
      .catch(error=> {
        res.status(400).json({error})
    
      })
    }
    else{
      Item.find()
      Item.paginate({},{page:req.query.page,limit: req.query.limit,customLabels: myCustomLabels})
      .then(data=> {
        res.status(200).json({data})
      })
      .catch(error=> {
        res.status(400).json({error})
    
      })
    }
  
  }


  module.exports = chkqty1;