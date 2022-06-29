const { Mission, Plan } = require("../models");

module.exports = [
  {
    method: "POST",
    path: "/missions",
    handler: async (req, res) => {
      const { name, planId, long, lat } = req.payload;
      try {
        return await Mission.create(
          {
            name: name,
            long: long,
            lat: lat,
            planId: planId,

          },
          { include: Plan }
        );
      } catch (error) {
        return res.response({
          status: "error",
          messsage: error,
        }).code(202);
      }
    },
  },
  {
    method: "GET",
    path: "/missions",
    handler: async (req, res) => {
      try {
        return await Mission.findAll({ include: Plan });
      } catch (error) {
        return res.response({
          status: "error",
          messsage: error,
        }).code(202);
      }
    },
  },
  {
    method: "GET",
    path: "/missions/{id}",
    handler: async (req, res) => {
      try {
        const { id } = req.params;
        return await Mission.findByPk(id, { include: Plan });
      } catch (error) {
        return res.response({
          status: "error",
          messsage: error,
        }).code(202);
      }
    },
  },
];
