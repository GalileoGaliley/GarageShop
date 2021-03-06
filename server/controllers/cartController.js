const {Ware, WareInfo, Basket, BasketWare} = require('../models/models.js');
const ApiError = require('../error/ApiError.js');
const path = require('path');
const uuid = require('uuid');
const {colors} = require('colors');


class cartController {
  async create (req, res, next) {
  console.log('addToCart'.red);
  console.log(req.query);
    try {

      let {wareId, counts, userId} = req.query;


      const basket = await Basket.findOne({
          where: {userId}
      });
      console.log('userId');
      let basketId = basket.id;
      console.log(basketId);
      console.log('userId');
      const basketWare = await BasketWare.create({counts: counts, wareId:wareId, basketId: basketId});
        return
      // return res.json(ware);
    }catch (err){
      console.log(err.red);
      next(ApiError.badRequest(err.message));
    }

  };
  async getAll(req, res) {
    //тут всё прекрасно не трогай запросы

      console.log('getBasket'.red);
      let {userId} = req.body;
      console.log('getBasket'.red);
      console.log(userId);
      console.log('getBasket'.red);

      let userIdInBasket;

      userIdInBasket = await Basket.findAndCountAll({where:{userId:userId}});

      let basketId = userIdInBasket.rows[0].dataValues.id;
      console.log('getAllWaresBasketUser'.red);
      console.log(basketId);
      console.log('getAllWaresBasketUser'.red);
      let waresInBasket = await BasketWare.findAndCountAll({where:{basketId: basketId}});
      let wares = [];
      let counts = [];
      let i = 0;
      
      while (i < waresInBasket.count) {
          wares.push(waresInBasket.rows[i].dataValues.wareId);
          counts.push(waresInBasket.rows[i].dataValues.counts)
          i++;
      };
      let data = [];
      let c = 0;
      while (c < wares.length) {
        console.log('log');
        let ware = await Ware.findOne({where: {id: wares[c]}})
        ware.dataValues.counts = counts[c]
        console.log(ware)
          data.push(ware)
          c++;

      };


      return res.json(data)

  };

};

//   async getOne (req, res) {
//       const {id} = req.params;
//       console.log(req.params.id);
//       const ware = await Ware.findOne({
//           where: {id}
//       })
//       return res.json(ware)
//   };
// };
//   async addToCart (id){
//
//   }


module.exports = new cartController();
