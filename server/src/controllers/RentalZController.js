const prisma = require('../models/prisma');

class RentalController {
  createForm = async (req, res, next) => {
    try {
      //Check form address is exist or not
      const formAddressExist = await prisma.rental.findUnique({
        where: {
          address: req.body.address,
        },
      });
      if (formAddressExist) {
        return res.json({ message: 'Form address already exists' });
      }

      const createForm = await prisma.rental.create({
        data: {
          address: req.body.address,
          bedroom: req.body.bedroom,
          furniture: req.body.furniture,
          note: req.body.note,
          pickDate: new Date(req.body.pickDate),
          property: req.body.property,
          rentalPrice: Number(req.body.rentalPrice),
          reporterName: req.body.reporterName,
        },
      });
      return res.json(createForm);
    } catch (error) {
      return next(error);
    }
  };

  getAllForm = async (req, res, next) => {
    try {
      const getAllFormInDb = await prisma.rental.findMany();
      return res.json(getAllFormInDb);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new RentalController();
